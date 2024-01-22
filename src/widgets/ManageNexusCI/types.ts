import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageNexusIntegrationSecretFormDataContext {
    nexusSecret: SecretKubeObjectInterface;
    nexusEDPComponent: EDPComponentKubeObjectInterface;
    mode: ValueOf<typeof FORM_MODES>;
    ownerReference: string | undefined;
    handleClosePanel?: () => void;
}

export interface ManageNexusIntegrationSecretProps {
    formData: ManageNexusIntegrationSecretFormDataContext;
}

export type ManageNexusIntegrationSecretFormValues = FormValues<
    typeof NEXUS_INTEGRATION_SECRET_FORM_NAMES
>;
