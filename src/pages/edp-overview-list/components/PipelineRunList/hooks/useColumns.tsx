import { Icon } from '@iconify/react';
import { HoverInfoLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import { IconButton, Link } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObject } from '../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { useDialogContext } from '../../../../../providers/Dialog/hooks';
import { GENERATE_URL_SERVICE } from '../../../../../services/url';
import { formatFullYear, humanizeDefault } from '../../../../../utils/date/humanize';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from '../../../../../widgets/PipelineRunGraph/constants';
import { EDPComponentDetailsRouteParams } from '../../../../edp-component-details/types';

export const useColumns = (): TableColumn<PipelineRunKubeObjectInterface>[] => {
    const { namespace } = useParams<EDPComponentDetailsRouteParams>();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

    const { setDialog } = useDialogContext();

    return React.useMemo(
        () => [
            {
                id: 'status',
                label: 'Status',
                render: resource => {
                    const status = PipelineRunKubeObject.parseStatus(resource);
                    const reason = PipelineRunKubeObject.parseStatusReason(resource);

                    const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(
                        status,
                        reason
                    );

                    return (
                        <StatusIcon
                            icon={icon}
                            color={color}
                            isRotating={isRotating}
                            width={25}
                            Title={`Status: ${status}. Reason: ${reason}`}
                        />
                    );
                },
                width: '5%',
            },
            {
                id: 'run',
                label: 'Run',
                render: resource => {
                    const {
                        metadata: { name, namespace },
                    } = resource;

                    if (!resource?.status?.pipelineSpec?.params?.[0]?.default) {
                        return <>{name}</>;
                    }

                    return (
                        <>
                            <Link
                                href={GENERATE_URL_SERVICE.createTektonPipelineRunLink(
                                    EDPComponentsURLS?.tekton,
                                    namespace,
                                    name
                                )}
                                target="_blank"
                                rel="noopener"
                            >
                                {name}
                            </Link>
                        </>
                    );
                },
                width: '40%',
            },
            {
                id: 'pipeline',
                label: 'Pipeline',
                render: resource => {
                    const {
                        metadata: { namespace },
                        spec: {
                            pipelineRef: { name: pipelineRefName },
                        },
                    } = resource;

                    if (!resource?.status?.pipelineSpec?.params?.[0]?.default) {
                        return <>{pipelineRefName}</>;
                    }

                    const pipelineLink = GENERATE_URL_SERVICE.createTektonPipelineLink(
                        EDPComponentsURLS?.tekton,
                        namespace,
                        pipelineRefName
                    );

                    return (
                        <>
                            <Link href={pipelineLink} target="_blank" rel="noopener">
                                {pipelineRefName}
                            </Link>
                        </>
                    );
                },
            },
            {
                id: 'time',
                label: 'Time',
                render: resource => {
                    if (!resource?.status?.startTime || !resource?.status?.completionTime) {
                        return <HoverInfoLabel label={''} hoverInfo={''} icon={ICONS.CALENDAR} />;
                    }

                    const startTimeDate = new Date(resource?.status?.startTime);
                    const completionTimeDate = new Date(resource?.status?.completionTime);
                    const time = humanizeDefault(
                        completionTimeDate.getTime(),
                        startTimeDate.getTime()
                    );

                    return (
                        <HoverInfoLabel
                            label={time}
                            hoverInfo={`Start: ${formatFullYear(
                                startTimeDate
                            )}. End: ${formatFullYear(completionTimeDate)}`}
                            icon={ICONS.CALENDAR}
                        />
                    );
                },
            },
            {
                id: 'diagram',
                label: 'Diagram',
                render: resource => {
                    return (
                        <IconButton
                            onClick={() =>
                                setDialog({
                                    modalName: PIPELINE_RUN_GRAPH_DIALOG_NAME,
                                    forwardedProps: {
                                        pipelineRun: resource,
                                    },
                                })
                            }
                        >
                            <Icon icon={ICONS.DIAGRAM} />
                        </IconButton>
                    );
                },
            },
        ],
        [EDPComponentsURLS?.tekton, setDialog]
    );
};
