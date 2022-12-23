import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { pluginLib } from '../../plugin.globals';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { streamResult } from '../common/streamResult';
import { streamResults } from '../common/streamResults';
import { EDPCodebaseKubeObjectConfig } from './config';
import {
    EDPCodebaseKubeObjectInterface,
    EDPCodebaseSpecInterface,
    EDPCodebaseStatusInterface,
} from './types';

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
} = EDPCodebaseKubeObjectConfig;

// @ts-ignore
export class EDPCodebaseKubeObject extends makeKubeObject<EDPCodebaseKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    getDetailsLink(type: string): string {
        return createRouteURL(type, {
            namespace: this.jsonData!.metadata.namespace,
            name: this.jsonData!.metadata.name,
        });
    }

    static get className(): string {
        return singularForm;
    }

    get spec(): EDPCodebaseSpecInterface {
        return this.jsonData!.spec;
    }

    get status(): EDPCodebaseStatusInterface {
        return this.jsonData!.status;
    }
}

export const streamCodebase = (
    name: string,
    namespace: string,
    cb: (data: EDPCodebaseKubeObjectInterface | EDPCodebaseKubeObjectInterface[]) => void,
    errCb: (err: Error) => void
): (() => void) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResult(url, name, cb, errCb);
};

export const streamCodebasesByTypeLabel = (
    codebaseType: CODEBASE_TYPES,
    cb: (data: EDPCodebaseKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
): (() => void) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return streamResults(
        url,
        cb,
        errCb,
        codebaseType !== CODEBASE_TYPES['ALL']
            ? {
                  labelSelector: `app.edp.epam.com/codebaseType=${codebaseType}`,
              }
            : null
    );
};

export const getCodebasesByTypeLabel = (
    namespace: string,
    codebaseType: string
): Promise<{ items: EDPCodebaseKubeObjectInterface[] }> => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=app.edp.epam.com/codebaseType=${codebaseType}`;

    return ApiProxy.request(url);
};
