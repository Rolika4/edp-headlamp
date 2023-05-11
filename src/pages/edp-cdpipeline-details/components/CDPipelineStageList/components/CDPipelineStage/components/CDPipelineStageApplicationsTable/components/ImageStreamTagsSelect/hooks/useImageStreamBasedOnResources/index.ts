import { EDPCDPipelineKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipelineStage/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../../../../../../../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCodebaseImageStream/types';

interface useImageStreamBasedOnResourcesInterface {
    enrichedApplicationWithItsImageStreams: EnrichedApplicationWithItsImageStreams;
    CDPipeline: EDPCDPipelineKubeObjectInterface;
    currentCDPipelineStage: EDPCDPipelineStageKubeObjectInterface;
    CDPipelineStages: EDPCDPipelineStageKubeObjectInterface[];
}
export const useImageStreamBasedOnResources = ({
    enrichedApplicationWithItsImageStreams,
    CDPipeline,
    currentCDPipelineStage,
    CDPipelineStages,
}: useImageStreamBasedOnResourcesInterface): {
    imageStream: EDPCodebaseImageStreamKubeObjectInterface;
} => {
    const {
        spec: { inputDockerStreams },
        metadata: { name: CDPipelineName },
    } = CDPipeline;

    const {
        spec: { order },
    } = currentCDPipelineStage;

    const normalizedInputDockerStreamNames = inputDockerStreams.map(el => el.replaceAll('.', '-'));

    const CDPipelineInputDockerStreamsSet = new Set<string>(normalizedInputDockerStreamNames);

    const { applicationImageStreams } = enrichedApplicationWithItsImageStreams;

    const findPreviousStage = (
        stages: EDPCDPipelineStageKubeObjectInterface[],
        currentStageOrder: number
    ): EDPCDPipelineStageKubeObjectInterface => {
        return stages.find(
            ({ spec: { order: stageOrder } }) => stageOrder === currentStageOrder - 1
        );
    };

    const getImageStreamByStageOrder = (
        imageStreams: EDPCodebaseImageStreamKubeObjectInterface[],
        order: number
    ): EDPCodebaseImageStreamKubeObjectInterface => {
        if (order === 0) {
            return (
                imageStreams &&
                imageStreams.find(el => CDPipelineInputDockerStreamsSet.has(el.metadata.name))
            );
        }

        const {
            spec: { name: previousStageName },
        } = findPreviousStage(CDPipelineStages, order);

        return (
            imageStreams &&
            imageStreams.find(
                ({ spec: { codebase }, metadata: { name } }) =>
                    name === `${CDPipelineName}-${previousStageName}-${codebase}-verified`
            )
        );
    };

    const imageStreamByStageOrder = getImageStreamByStageOrder(applicationImageStreams, order);

    return { imageStream: imageStreamByStageOrder ?? null };
};
