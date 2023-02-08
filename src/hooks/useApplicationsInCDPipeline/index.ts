import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { getCodebaseImageStreams } from '../../k8s/EDPCodebaseImageStream';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../k8s/EDPCodebaseImageStream/types';
import { React } from '../../plugin.globals';
import { useCodebasesByType } from '../useCodebasesByTypeLabel';

interface useApplicationsInCDPipelineProps {
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
}

export interface EnrichedApplication {
    application: EDPCodebaseKubeObjectInterface;
    applicationImageStream: string;
    applicationImageStreams: EDPCodebaseImageStreamKubeObjectInterface[];
    toPromote: boolean;
}

export const useApplicationsInCDPipeline = ({
    CDPipelineData,
}: useApplicationsInCDPipelineProps): {
    applications: EnrichedApplication[];
    error: Error;
} => {
    const { applications, error: codebasesError } = useCodebasesByType({
        namespace: CDPipelineData?.metadata?.namespace,
        codebaseType: CODEBASE_TYPES['APPLICATION'],
    });

    const [error, setError] = React.useState<Error>(codebasesError);

    const [enrichedApplications, setEnrichedApplications] = React.useState([]);

    const getEnrichedApplications = React.useCallback(async () => {
        // it shouldn't update applications if there's no CDPipeline data or CDPipeline data didn't change
        // we store CDPipeline version in CDPipelineResourceVersion ref

        if (!CDPipelineData || !applications.length) {
            return;
        }

        const {
            metadata: { namespace },
            spec: {
                applications: CDPipelineApplicationList,
                applicationsToPromote: CDPipelineApplicationListToPromote,
            },
        } = CDPipelineData;

        const CDPipelineApplicationListSet = new Set<string>(CDPipelineApplicationList);
        const CDPipelineApplicationToPromoteListSet = new Set<string>(
            CDPipelineApplicationListToPromote
        );

        const { items: codebaseImageStreams } = await getCodebaseImageStreams(namespace);

        return await Promise.all(
            applications.map(async el => {
                const {
                    metadata: { name },
                } = el;

                if (!CDPipelineApplicationListSet.has(name)) {
                    return;
                }

                const codebaseImageStreamsByCodebaseName = codebaseImageStreams.filter(
                    ({ spec: { codebase } }) => codebase === name
                );

                const CDPipelineSpecApplicationIndex = CDPipelineData.spec.applications.findIndex(
                    appName => appName === name
                );

                const applicationImageStream =
                    CDPipelineData.spec.inputDockerStreams[CDPipelineSpecApplicationIndex];

                return {
                    application: { ...el },
                    applicationImageStream,
                    toPromote: CDPipelineApplicationToPromoteListSet.has(name),
                    applicationImageStreams: codebaseImageStreamsByCodebaseName,
                };
            })
        );
    }, [CDPipelineData, applications]);

    React.useEffect(() => {
        (async () => {
            try {
                const enrichedApplications = await getEnrichedApplications();
                if (!enrichedApplications) {
                    return;
                }
                setEnrichedApplications(enrichedApplications.filter(Boolean));
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [getEnrichedApplications]);

    return {
        applications: enrichedApplications,
        error: error,
    };
};
