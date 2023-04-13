import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { CI_TOOLS } from '../../../../constants/ciTools';
import { ICONS } from '../../../../constants/icons';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { useEDPComponents } from '../../../../hooks/useEDPComponents';
import { useNamespace } from '../../../../hooks/useNamespace';
import { streamPipelineRunListByCodebaseBranchLabel } from '../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { Iconify, MuiCore, MuiStyles, React } from '../../../../plugin.globals';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { parsePipelineRunStatus } from '../../../../utils/parsePipelineRunStatus';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { rem } from '../../../../utils/styling/rem';
import { FormSelect } from '../../../FormComponents';
import { HeadlampNameValueTable } from '../../../HeadlampNameValueTable';
import { HeadlampSimpleTable } from '../../../HeadlampSimpleTable';
import { Render } from '../../../Render';
import { StatusIcon } from '../../../StatusIcon';
import { isDefaultBranch } from '../../utils';
import { CodebaseBranchActions } from '../CodebaseBranchActions';
import { useMainInfoRows } from './hooks/useMainInfoRows';
import { usePipelineRunsColumns } from './hooks/usePipelineRunsColumns';
import { useStyles } from './styles';
import { CodebaseBranchProps } from './types';

const {
    IconButton,
    Tooltip,
    Grid,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Link,
    Paper,
} = MuiCore;
const { Icon } = Iconify;
const { useTheme } = MuiStyles;

const pipelineRunTypes = Object.entries(PIPELINE_TYPES).filter(
    ([, value]) => value !== PIPELINE_TYPES['DEPLOY']
);
const pipelineRunTypeSelectOptions = pipelineRunTypes.map(([, value]) => ({
    label: capitalizeFirstLetter(value),
    value: value,
}));

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

export const CodebaseBranch = ({
    defaultBranch,
    codebaseBranchData,
    expandedPanel,
    id,
    handlePanelChange,
    codebaseData,
    gitServers,
    triggerTemplates,
}: CodebaseBranchProps): React.ReactElement => {
    const {
        register,
        control,
        formState: { errors },
    } = useForm();
    const theme: DefaultTheme = useTheme();
    const { namespace } = useNamespace();

    const { EDPComponents } = useEDPComponents({ namespace });
    const tektonUrlOrigin = React.useMemo(
        () => EDPComponents.filter(el => el.spec.type === 'tekton')?.[0]?.spec?.url,
        [EDPComponents]
    );

    const {
        spec: { ciTool },
    } = codebaseData;

    const jenkinsCiToolIsUsed = ciTool === CI_TOOLS['JENKINS'];

    const classes = useStyles();
    const mainInfoRows = useMainInfoRows(codebaseBranchData);
    const pipelineRunsColumns = usePipelineRunsColumns(tektonUrlOrigin);
    const normalizedCodebaseBranchName = codebaseBranchData.metadata.name.replaceAll('/', '-');

    const [pipelineRuns, setPipelineRuns] = React.useState<{
        all: PipelineRunKubeObjectInterface[];
        latestBuildRunStatus: string;
    }>({
        all: null,
        latestBuildRunStatus: CUSTOM_RESOURCE_STATUSES['UNKNOWN'],
    });

    const [, setError] = React.useState<Error>(null);
    const [pipelineRunType, setPipelineRunType] = React.useState<PIPELINE_TYPES>(
        PIPELINE_TYPES['ALL']
    );
    const filteredPipelineRunsByType = React.useMemo(
        () =>
            pipelineRunType === 'all'
                ? pipelineRuns.all
                : pipelineRuns.all.filter(
                      ({ metadata: { labels } }) =>
                          labels['app.edp.epam.com/pipelinetype'] === pipelineRunType
                  ),
        [pipelineRunType, pipelineRuns.all]
    );
    const handleStorePipelineRuns = React.useCallback(
        (socketPipelineRuns: PipelineRunKubeObjectInterface[]) => {
            if (jenkinsCiToolIsUsed) {
                return;
            }

            const sortedPipelineRuns = socketPipelineRuns.sort(sortKubeObjectByCreationTimestamp);

            const [latestBuildPipelineRun] = sortedPipelineRuns;

            if (
                latestBuildPipelineRun?.status?.conditions?.[0]?.reason ===
                pipelineRuns.latestBuildRunStatus
            ) {
                return;
            }

            const pipelineRunStatus = parsePipelineRunStatus(latestBuildPipelineRun);

            setPipelineRuns({
                all: sortedPipelineRuns,
                latestBuildRunStatus: pipelineRunStatus,
            });
        },
        [jenkinsCiToolIsUsed, pipelineRuns.latestBuildRunStatus]
    );

    const handleStreamError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        if (jenkinsCiToolIsUsed) {
            return;
        }

        const cancelStream = streamPipelineRunListByCodebaseBranchLabel(
            normalizedCodebaseBranchName,
            handleStorePipelineRuns,
            handleStreamError,
            codebaseBranchData.metadata.namespace
        );

        return () => cancelStream();
    }, [
        normalizedCodebaseBranchName,
        handleStreamError,
        handleStorePipelineRuns,
        codebaseBranchData,
        jenkinsCiToolIsUsed,
    ]);

    const status = codebaseBranchData.status
        ? codebaseBranchData.status.status
        : CUSTOM_RESOURCE_STATUSES['UNKNOWN'];

    const statusTitle = (
        <>
            <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                {capitalizeFirstLetter(status)}
            </Typography>
            <Render condition={status === CUSTOM_RESOURCE_STATUSES['FAILED']}>
                <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                    {codebaseBranchData?.status?.detailedMessage}
                </Typography>
            </Render>
        </>
    );

    return (
        <div style={{ paddingBottom: rem(16) }}>
            <Accordion expanded={expandedPanel === id} onChange={handlePanelChange(id)}>
                <AccordionSummary expandIcon={<Icon icon={ICONS['ARROW_DOWN']} />}>
                    <div className={classes.branchHeader}>
                        <StatusIcon status={status} customTitle={statusTitle} />
                        <Typography variant={'h6'} style={{ lineHeight: 1, marginTop: rem(2) }}>
                            {codebaseBranchData.spec.branchName}
                        </Typography>
                        <Render condition={isDefaultBranch(codebaseData, codebaseBranchData)}>
                            <Chip
                                label="default"
                                className={clsx([classes.labelChip, classes.labelChipBlue])}
                            />
                        </Render>
                        <Render condition={codebaseBranchData.spec.release}>
                            <Chip
                                label="release"
                                className={clsx([classes.labelChip, classes.labelChipGreen])}
                            />
                        </Render>
                        <div style={{ marginLeft: 'auto' }}>
                            <Grid container spacing={1} alignItems={'center'}>
                                <Render condition={!jenkinsCiToolIsUsed}>
                                    <Grid item>
                                        <div className={classes.pipelineRunStatus}>
                                            <StatusIcon
                                                status={pipelineRuns.latestBuildRunStatus}
                                                customTitle={`Last pipeline run status: ${pipelineRuns.latestBuildRunStatus}`}
                                                width={18}
                                            />
                                        </div>
                                    </Grid>
                                </Render>
                                <Render condition={!!codebaseData?.status?.gitWebUrl}>
                                    <Grid item>
                                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                                        <div
                                            onClick={stopPropagation}
                                            onFocus={stopPropagation}
                                            style={{ cursor: 'default' }}
                                        >
                                            <Tooltip
                                                title={
                                                    <Grid
                                                        container
                                                        alignItems={'center'}
                                                        spacing={1}
                                                    >
                                                        <Grid item>Go to the Source Code </Grid>
                                                        <Grid item>
                                                            <Icon
                                                                icon={ICONS.NEW_WINDOW}
                                                                color={theme.palette.grey['500']}
                                                                width="15"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                }
                                            >
                                                <IconButton
                                                    component={Link}
                                                    href={codebaseData?.status?.gitWebUrl}
                                                    target={'_blank'}
                                                >
                                                    <Icon
                                                        icon={ICONS.GIT_BRANCH}
                                                        color={theme.palette.grey['500']}
                                                        width="20"
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </Grid>
                                </Render>
                                <Grid item>
                                    <CodebaseBranchActions
                                        codebaseBranchData={codebaseBranchData}
                                        defaultBranch={defaultBranch}
                                        codebase={codebaseData}
                                        gitServers={gitServers}
                                        triggerTemplates={triggerTemplates}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Render condition={!jenkinsCiToolIsUsed}>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Render condition={!!pipelineRuns?.all?.length}>
                                        <Grid item xs={4}>
                                            <FormSelect
                                                {...register('type', {
                                                    onChange: ({ target: { value } }) =>
                                                        setPipelineRunType(value),
                                                })}
                                                control={control}
                                                errors={errors}
                                                name={'type'}
                                                label={'Type'}
                                                options={pipelineRunTypeSelectOptions}
                                                defaultValue={PIPELINE_TYPES['ALL']}
                                            />
                                        </Grid>
                                    </Render>
                                    <Grid item xs={12}>
                                        <Paper>
                                            <HeadlampSimpleTable
                                                columns={pipelineRunsColumns}
                                                data={filteredPipelineRunsByType}
                                                emptyMessage={
                                                    pipelineRunType === PIPELINE_TYPES['ALL']
                                                        ? 'No pipeline runs'
                                                        : `No ${pipelineRunType} pipeline runs`
                                                }
                                            />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Render>
                        <Grid item xs={12}>
                            <HeadlampNameValueTable rows={mainInfoRows} />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
