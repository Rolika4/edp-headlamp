import { Icon } from '@iconify/react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Link,
    Tooltip,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { Graph } from '../../components/Graph';
import { Edge } from '../../components/Graph/components/Edge';
import { Node } from '../../components/Graph/components/Node';
import { MyNode } from '../../components/Graph/components/types';
import { InfoColumnsAccordion } from '../../components/InfoColumns';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { Render } from '../../components/Render';
import { StatusIcon } from '../../components/StatusIcon';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObject } from '../../k8s/PipelineRun';
import { TaskRunKubeObject } from '../../k8s/TaskRun';
import { TASK_RUN_STEP_REASON, TASK_RUN_STEP_STATUS } from '../../k8s/TaskRun/constants';
import { TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN } from '../../k8s/TaskRun/labels';
import { TaskRunKubeObjectInterface } from '../../k8s/TaskRun/types';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { GENERATE_URL_SERVICE } from '../../services/url';
import { ValueOf } from '../../types/global';
import { formatFullYear, humanizeDefault } from '../../utils/date/humanize';
import { rem } from '../../utils/styling/rem';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from './constants';
import { useStyles } from './styles';
import { PipelineRunGraphDialogForwardedProps } from './types';

interface TaskRunStep {
    // @ts-ignore
    name: string;
    [key: string]: {
        reason?: ValueOf<typeof TASK_RUN_STEP_REASON>;
    };
}

const parseTaskRunStepStatus = (step: TaskRunStep) => {
    return step?.[TASK_RUN_STEP_STATUS.RUNNING]
        ? TASK_RUN_STEP_STATUS.RUNNING
        : step?.[TASK_RUN_STEP_STATUS.WAITING]
        ? TASK_RUN_STEP_STATUS.WAITING
        : step?.[TASK_RUN_STEP_STATUS.TERMINATED]
        ? TASK_RUN_STEP_STATUS.TERMINATED
        : undefined;
};

const parseTaskRunStepStatusObject = (step: TaskRunStep) => {
    return (
        step?.[TASK_RUN_STEP_STATUS.RUNNING] ||
        step?.[TASK_RUN_STEP_STATUS.WAITING] ||
        step?.[TASK_RUN_STEP_STATUS.TERMINATED]
    );
};

const parseTaskRunStepReason = (step: TaskRunStep): ValueOf<typeof TASK_RUN_STEP_REASON> => {
    const statusObject = parseTaskRunStepStatusObject(step);
    return statusObject?.reason;
};

export const PipelineRunGraph = () => {
    const classes = useStyles();

    const {
        open,
        forwardedProps: { pipelineRun },
        closeDialog,
    } = useSpecificDialogContext<PipelineRunGraphDialogForwardedProps>(
        PIPELINE_RUN_GRAPH_DIALOG_NAME
    );

    const [taskRuns] = TaskRunKubeObject.useList({
        labelSelector: `${TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN}=${pipelineRun.metadata.name}`,
    });

    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(pipelineRun.metadata.namespace);

    const pipelineRunTasks = pipelineRun?.status?.pipelineSpec?.tasks;

    const PipelineRunTaskRunListByNameMap = React.useMemo(() => {
        if (taskRuns === null || !pipelineRunTasks) {
            return;
        }

        const map = new Map<string, TaskRunKubeObjectInterface>();
        pipelineRunTasks?.forEach(item => {
            map.set(item.name, item);
        });
        return map;
    }, [taskRuns, pipelineRunTasks]);

    const TaskRunListByNameMap = React.useMemo(() => {
        if (taskRuns === null) {
            return;
        }

        const map = new Map<string, TaskRunKubeObjectInterface>();
        taskRuns.forEach(item => {
            map.set(item.metadata.labels['tekton.dev/pipelineTask'], item);
        });
        return map;
    }, [taskRuns]);

    const nodes = React.useMemo(() => {
        if (!PipelineRunTaskRunListByNameMap) {
            return null;
        }

        let _nodes = [];

        for (const name of PipelineRunTaskRunListByNameMap.keys()) {
            const TaskRunByName = TaskRunListByNameMap.get(name);
            const status = TaskRunKubeObject.parseStatus(TaskRunByName);
            const reason = TaskRunKubeObject.parseStatusReason(TaskRunByName);
            const [, color] = PipelineRunKubeObject.getStatusIcon(status, reason);

            _nodes = [
                {
                    id: `task::${name}`,
                    height: 40,
                    width: 180,
                    color,
                    data: { name, TaskRunByName },
                },
                ..._nodes,
            ];
        }

        return _nodes;
    }, [PipelineRunTaskRunListByNameMap, TaskRunListByNameMap]);

    const edges = React.useMemo(() => {
        if (!PipelineRunTaskRunListByNameMap) {
            return null;
        }

        let _edges = [];

        for (const [name, value] of PipelineRunTaskRunListByNameMap.entries()) {
            const TaskRunByName = TaskRunListByNameMap.get(name);
            const status = TaskRunKubeObject.parseStatus(TaskRunByName);
            const reason = TaskRunKubeObject.parseStatusReason(TaskRunByName);

            const [, color] = PipelineRunKubeObject.getStatusIcon(status, reason);

            if (!value?.runAfter) {
                continue;
            }

            for (const item of value.runAfter) {
                _edges = [
                    {
                        id: `edge::${name}::${item}`,
                        source: `task::${item}`,
                        color,
                        target: `task::${name}`,
                    },
                    ..._edges,
                ];
            }
        }

        return _edges;
    }, [PipelineRunTaskRunListByNameMap, TaskRunListByNameMap]);

    const diagramIsReady = nodes !== null && edges !== null;

    const renderTaskLegend = React.useCallback(
        (steps: TaskRunStep[], taskRun: TaskRunKubeObjectInterface) => {
            if (!steps) {
                return null;
            }

            const taskRunStatus = TaskRunKubeObject.parseStatus(taskRun);
            const taskRunReason = TaskRunKubeObject.parseStatusReason(taskRun);

            const [icon, color, isRotating] = TaskRunKubeObject.getStatusIcon(
                taskRunStatus,
                taskRunReason
            );

            return (
                <div style={{ padding: `${rem(10)} 0` }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <StatusIcon
                                        icon={icon}
                                        color={color}
                                        isRotating={isRotating}
                                        Title={`Status: ${taskRunStatus}. Reason: ${taskRunReason}`}
                                        width={15}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant={'subtitle2'}
                                        className={classes.treeItemTitle}
                                    >
                                        {taskRun.metadata.labels['tekton.dev/pipelineTask']}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'subtitle1'}>Steps:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {steps.map(step => {
                                const stepName = step?.name;
                                const status = parseTaskRunStepStatus(step);
                                const reason = parseTaskRunStepReason(step);
                                const [icon, color, isRotating] =
                                    TaskRunKubeObject.getStepStatusIcon(status, reason);
                                return (
                                    <Grid item xs={12}>
                                        <Grid container spacing={1} alignItems={'center'}>
                                            <Grid item>
                                                <StatusIcon
                                                    icon={icon}
                                                    color={color}
                                                    isRotating={isRotating}
                                                    Title={`Status: ${status}. Reason: ${reason}`}
                                                    width={15}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant={'subtitle2'} title={stepName}>
                                                    {stepName}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </div>
            );
        },
        [classes.treeItemTitle]
    );

    const renderNode = React.useCallback(
        (node: MyNode<{ name: string; TaskRunByName: TaskRunKubeObjectInterface }>) => {
            const {
                data: { name, TaskRunByName },
            } = node;

            const steps = TaskRunByName?.status?.steps;

            const status = TaskRunKubeObject.parseStatus(TaskRunByName);
            const reason = TaskRunKubeObject.parseStatusReason(TaskRunByName);
            const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(status, reason);
            const TaskLegend = renderTaskLegend(steps, TaskRunByName);

            return (
                // @ts-ignore
                <Node {...node}>
                    <Tooltip title={<>{TaskLegend}</>} interactive arrow placement={'bottom'}>
                        <Grid container spacing={2} alignItems={'center'} wrap={'nowrap'}>
                            <Grid item>
                                <StatusIcon
                                    icon={icon}
                                    color={color}
                                    isRotating={isRotating}
                                    Title={null}
                                    width={15}
                                />
                            </Grid>
                            <Grid item style={{ overflow: 'hidden' }}>
                                <Typography variant={'subtitle2'} className={classes.treeItemTitle}>
                                    {name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Tooltip>
                </Node>
            );
        },
        [classes.treeItemTitle, renderTaskLegend]
    );

    const infoRows = React.useMemo(() => {
        const namespace = pipelineRun?.metadata.namespace;
        const pipelineRunName = pipelineRun?.metadata.name;
        const pipelineRefName = pipelineRun?.spec?.pipelineRef?.name;

        const pipelineRunLink = GENERATE_URL_SERVICE.createTektonPipelineRunLink(
            EDPComponentsURLS?.tekton,
            namespace,
            pipelineRunName
        );

        const pipelineLink = pipelineRun?.status?.pipelineSpec?.params?.[0]?.default
            ? GENERATE_URL_SERVICE.createTektonPipelineLink(
                  EDPComponentsURLS?.tekton,
                  namespace,
                  pipelineRefName
              )
            : pipelineRefName;

        const startTimeDate = new Date(pipelineRun?.status?.startTime);
        const completionTimeDate = new Date(pipelineRun?.status?.completionTime);
        const durationTime = humanizeDefault(completionTimeDate.getTime(), startTimeDate.getTime());

        const pipelineRunStatus = PipelineRunKubeObject.parseStatus(pipelineRun);
        const pipelineRunReason = PipelineRunKubeObject.parseStatusReason(pipelineRun);
        const pipelineRunMessage = PipelineRunKubeObject.parseStatusMessage(pipelineRun);

        const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(
            pipelineRunStatus,
            pipelineRunReason
        );

        return [
            [
                {
                    label: 'Name',
                    text: pipelineRun?.metadata.name,
                },
                {
                    label: 'Status',
                    text: `${pipelineRunStatus}. Reason: ${pipelineRunReason}.`,
                    icon: (
                        <StatusIcon
                            Title={`${pipelineRunStatus}. Reason: ${pipelineRunReason}`}
                            icon={icon}
                            color={color}
                            isRotating={isRotating}
                            width={15}
                        />
                    ),
                },
                {
                    label: 'Message',
                    text: pipelineRunMessage,
                },
                {
                    label: 'Started at',
                    text: formatFullYear(startTimeDate),
                },
                {
                    label: 'Ended at',
                    text: formatFullYear(completionTimeDate),
                },
                {
                    label: 'Duration',
                    text: durationTime,
                },
            ],
            [
                {
                    label: 'Link',
                    text: (
                        <Link href={pipelineRunLink} target="_blank" rel="noopener">
                            {pipelineRunName}
                        </Link>
                    ),
                },
                {
                    label: 'Pipeline',
                    text: (
                        <Link href={pipelineLink} target="_blank" rel="noopener">
                            {pipelineRefName}
                        </Link>
                    ),
                },
            ],
        ];
    }, [EDPComponentsURLS?.tekton, pipelineRun]);

    return (
        <Dialog
            open={open}
            fullWidth
            onClose={() => closeDialog()}
            maxWidth={'xl'}
            className={classes.dialog}
        >
            <DialogTitle>
                <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <Grid item>
                        <Typography variant={'h4'}>Tree Diagram</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => closeDialog()}>
                            <Icon icon={ICONS.CROSS} />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InfoColumnsAccordion infoRows={infoRows} title={'Details'} />
                    </Grid>
                    <Grid item xs={12} style={{ minHeight: rem(300) }}>
                        <LoadingWrapper isLoading={taskRuns === null && !diagramIsReady}>
                            <Render condition={diagramIsReady}>
                                <div>
                                    <Graph
                                        direction={'RIGHT'}
                                        nodes={nodes}
                                        edges={edges}
                                        id={'pipeline-run-steps'}
                                        renderEdge={edge => <Edge direction={'RIGHT'} {...edge} />}
                                        renderNode={renderNode}
                                    />
                                </div>
                            </Render>
                            <Render condition={!pipelineRunTasks || !pipelineRunTasks?.length}>
                                <Typography variant={'body1'} align={'center'}>
                                    The PipelineRun has no tasks
                                </Typography>
                            </Render>
                            <Render condition={!taskRuns?.length}>
                                <Typography variant={'body1'} align={'center'}>
                                    Couldn't find TaskRuns for the PipelineRun
                                </Typography>
                            </Render>
                        </LoadingWrapper>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};
