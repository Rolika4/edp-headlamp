import { React } from '../../../../../plugin.globals';
import { EDPKubeMetadata } from '../../../../../types/k8s';
import { formatDateUTCToLocal } from '../../../../../utils/format/formatDateUTCToLocal';
import { MappedProperties } from '../../../../MappedProperties';

export const useRows = (metadata: EDPKubeMetadata) =>
    React.useMemo(
        () => [
            {
                name: 'Name',
                value: metadata.name,
            },
            {
                name: 'Namespace',
                value: metadata.namespace,
            },
            {
                name: 'Created',
                value: formatDateUTCToLocal(metadata.creationTimestamp),
            },
            {
                name: 'Finalizers',
                value: <MappedProperties properties={metadata.finalizers} variant={'inline'} />,
            },
            {
                name: 'Generation',
                value: String(metadata.generation),
            },
            {
                name: 'Resource version',
                value: metadata.resourceVersion,
            },
            {
                name: 'UID',
                value: metadata.uid,
            },
        ],
        [metadata]
    );
