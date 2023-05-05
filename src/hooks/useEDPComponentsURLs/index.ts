import { EDPComponentKubeObject } from '../../k8s/EDPComponent';
import { REQUEST_KEY_QUERY_EDP_COMPONENTS } from '../../k8s/EDPComponent/requestKeys';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { React } from '../../plugin.globals';
import { useResourceListQuery } from '../useResourceListQuery';

export const useEDPComponentsURLs = (): { [key: string]: string } => {
    const [EDPComponentURLS, setEDPComponentURLS] = React.useState<{ [key: string]: string }>({});

    useResourceListQuery<EDPComponentKubeObjectInterface>({
        queryKey: REQUEST_KEY_QUERY_EDP_COMPONENTS,
        queryFn: EDPComponentKubeObject.getList,
        options: {
            onSuccess: data => {
                const EDPComponentURLS = data.items.reduce((acc, cur) => {
                    acc[cur.spec.type] = cur.spec.url;
                    return acc;
                }, {});
                setEDPComponentURLS(EDPComponentURLS);
            },
        },
    });

    return EDPComponentURLS;
};
