import { pluginLib } from '../../plugin.globals';
import { streamResults } from '../common/streamResults';
import { ApplicationKubeObjectConfig } from './config';
import { ApplicationKubeObjectInterface, ApplicationSpec, ApplicationStatus } from './types';

const {
    ApiProxy,
    K8s: {
        cluster: { makeKubeObject },
    },
} = pluginLib;

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = ApplicationKubeObjectConfig;

// @ts-ignore
export class ApplicationKubeObject extends makeKubeObject<ApplicationKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): ApplicationSpec {
        return this.jsonData!.spec;
    }

    get status(): ApplicationStatus {
        return this.jsonData!.status;
    }
}

export const streamApplicationListByPipelineStageLabel = (
    pipelineName: string,
    pipelineStageName: string,
    cb: (data: ApplicationKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
): (() => void) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return streamResults(url, cb, errCb, {
        labelSelector: `app.edp.epam.com/pipeline=${pipelineName},app.edp.epam.com/stage=${pipelineStageName} `,
    });
};
