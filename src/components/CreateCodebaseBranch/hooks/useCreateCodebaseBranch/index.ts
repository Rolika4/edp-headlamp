import { useCallback } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { React } from '../../../../plugin.globals';

interface CreateCodebaseBranchProps {
    codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
    defaultCodebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
}

export const useCreateCodebaseBranch = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}): {
    createCodebaseBranch: (props: CreateCodebaseBranchProps) => Promise<void>;
    mutations: {
        codebaseBranchCreateMutation: UseMutationResult<
            EDPCodebaseBranchKubeObjectInterface,
            Error,
            { codebaseBranchData: EDPCodebaseBranchKubeObjectInterface }
        >;
        codebaseBranchEditMutation: UseMutationResult<
            EDPCodebaseBranchKubeObjectInterface,
            Error,
            { codebaseBranchData: EDPCodebaseBranchKubeObjectInterface }
        >;
    };
} => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);
    const {
        showBeforeRequestMessage,
        showRequestErrorMessage,
        showRequestSuccessMessage,
        showRequestErrorDetailedMessage,
    } = useRequestStatusMessages();

    const codebaseBranchCreateMutation = useMutation<
        EDPCodebaseBranchKubeObjectInterface,
        Error,
        {
            codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
        }
    >(
        'codebaseBranchCreateMutation',
        ({ codebaseBranchData }) => {
            return EDPCodebaseBranchKubeObject.apiEndpoint.post(codebaseBranchData);
        },
        {
            onMutate: ({ codebaseBranchData }) =>
                showBeforeRequestMessage(codebaseBranchData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { codebaseBranchData }) => {
                showRequestSuccessMessage(codebaseBranchData.metadata.name, CRUD_TYPES.CREATE);
            },
            onError: (error, { codebaseBranchData }) => {
                showRequestErrorMessage(codebaseBranchData.metadata.name, CRUD_TYPES.CREATE);
                showRequestErrorDetailedMessage(error);
                console.error(error);
            },
        }
    );

    const codebaseBranchEditMutation = useMutation<
        EDPCodebaseBranchKubeObjectInterface,
        Error,
        {
            codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
        }
    >(
        'codebaseBranchEditMutation',
        ({ codebaseBranchData }) => {
            return EDPCodebaseBranchKubeObject.apiEndpoint.put(codebaseBranchData);
        },
        {
            onMutate: ({ codebaseBranchData }) =>
                showBeforeRequestMessage(codebaseBranchData.metadata.name, CRUD_TYPES.EDIT),
            onSuccess: (data, { codebaseBranchData }) => {
                showRequestSuccessMessage(codebaseBranchData.metadata.name, CRUD_TYPES.EDIT);
            },
            onError: (error, { codebaseBranchData }) => {
                showRequestErrorMessage(codebaseBranchData.metadata.name, CRUD_TYPES.EDIT);
                showRequestErrorDetailedMessage(error);
                console.error(error);
            },
        }
    );

    const createCodebaseBranch = React.useCallback(
        async ({ codebaseBranchData, defaultCodebaseBranchData }: CreateCodebaseBranchProps) => {
            codebaseBranchCreateMutation.mutate(
                { codebaseBranchData },
                {
                    onSuccess: () => {
                        if (defaultCodebaseBranchData) {
                            codebaseBranchEditMutation.mutate({
                                codebaseBranchData: defaultCodebaseBranchData,
                            });
                        }

                        invokeOnSuccessCallback();
                    },
                    onError: () => {
                        invokeOnErrorCallback();
                    },
                }
            );
        },
        [
            codebaseBranchCreateMutation,
            codebaseBranchEditMutation,
            invokeOnErrorCallback,
            invokeOnSuccessCallback,
        ]
    );

    const mutations = {
        codebaseBranchCreateMutation,
        codebaseBranchEditMutation,
    };

    return { createCodebaseBranch, mutations };
};
