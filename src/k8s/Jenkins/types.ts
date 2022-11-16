import { EDPKubeObjectInterface } from '../../types/k8s';

export interface JenkinsSpec {
    basePath?: string;
    edpSpec?: {
        dnsWildcard: string;
    };
    keycloakSpec: {
        enabled: boolean;
        isPrivate?: boolean;
        realm?: string;
        secretName?: string;
    };
    sharedLibraries?:
        | {
              name: string;
              secret?: string | null;
              tag: string;
              type?: string | null;
              url: string;
          }[]
        | null;
}

export interface JenkinsStatus {
    adminSecretName?: string;
    available?: boolean;
    jobProvisions?:
        | {
              name: string;
              scope: string;
          }[]
        | null;
    lastTimeUpdated?: string;
    slaves?:
        | {
              name?: string;
          }[]
        | null;
}

export interface JenkinsKubeObjectInterface extends EDPKubeObjectInterface {
    spec: JenkinsSpec;
    status: JenkinsStatus;
}
