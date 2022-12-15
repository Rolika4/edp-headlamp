import { createCodebaseSecretInstance } from '../../../../configs/k8s-resource-instances/resources/secret';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { Notistack, pluginLib, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { createErrorMessage } from '../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../utils/throwErrorNoty';
import { CodebaseAuthData } from '../../types';

const { useSnackbar } = Notistack;
const {
    K8s: { secret: SecretKubeObject },
} = pluginLib;

const requestIsFailed = (reqRes: DeepPartial<EDPKubeObjectInterface>) =>
    Object.hasOwn(reqRes, 'status') && reqRes.status !== 'Success';

const deleteSecret = async (secretExample: DeepPartial<EDPKubeObjectInterface>): Promise<void> => {
    await SecretKubeObject.default.apiEndpoint.delete(
        secretExample.metadata.namespace,
        secretExample.metadata.name
    );
};

export const useCreateCodebase = (
    onSuccess: () => void,
    onError: () => void
): {
    createCodebase: (
        newCodebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>,
        codebaseAuthData: CodebaseAuthData | null
    ) => Promise<EDPCodebaseKubeObjectInterface | undefined>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const createCodebase = React.useCallback(
        async (
            newCodebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>,
            codebaseAuthData: CodebaseAuthData | null
        ): Promise<EDPCodebaseKubeObjectInterface | undefined> => {
            let secretCreated: boolean = false;
            let secretExample: DeepPartial<EDPKubeObjectInterface>;

            const {
                metadata: { name },
            } = newCodebaseData;

            try {
                if (codebaseAuthData === null) {
                    const result = await EDPCodebaseKubeObject.apiEndpoint.post(newCodebaseData);
                    onSuccess();
                    return result; // return statement is used only for testing purposes, it's not used anywhere except test
                }

                const { repositoryLogin, repositoryPasswordOrApiToken } = codebaseAuthData;
                secretExample = createCodebaseSecretInstance(
                    name,
                    repositoryLogin,
                    repositoryPasswordOrApiToken
                );

                const secretPostRequestResult = await SecretKubeObject.default.apiEndpoint.post(
                    secretExample
                );

                secretCreated = true;

                if (requestIsFailed(secretPostRequestResult)) {
                    await deleteSecret(secretExample);
                    secretCreated = false;
                }

                const codebasePostRequestResult = await EDPCodebaseKubeObject.apiEndpoint.post(
                    newCodebaseData
                );

                if (requestIsFailed(codebasePostRequestResult)) {
                    await deleteSecret(secretExample);
                    secretCreated = false;
                }

                if (secretCreated && codebasePostRequestResult) {
                    onSuccess();
                    return codebasePostRequestResult; // return statement is used only for testing purposes, it's not used anywhere except test
                }
            } catch (err: any) {
                if (secretCreated) {
                    await deleteSecret(secretExample);
                }
                const errorMessage = createErrorMessage(err, name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                onError();
                throw err;
            }
        },
        [enqueueSnackbar, onError, onSuccess]
    );

    return { createCodebase };
};
