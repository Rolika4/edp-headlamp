import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { React } from '../../../../../plugin.globals';
import { FieldEventTarget, FormNameObject } from '../../../../../types/forms';

interface UseUpdateFieldsDependingOnChosenIntegrationStrategyProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    resetField: (name: string) => void;
}

export const useUpdateFieldsDependingOnChosenIntegrationStrategy = ({
    watch,
    handleFormFieldChange,
    resetField,
    names,
}: UseUpdateFieldsDependingOnChosenIntegrationStrategyProps): void => {
    const strategyFieldValue = watch(names.strategy.name);

    const resetFields = React.useCallback(
        (fieldNames: string[]) => {
            for (const fieldName of fieldNames) {
                resetField(fieldName);
                handleFormFieldChange({
                    name: fieldName,
                    value: undefined,
                });
            }
        },
        [handleFormFieldChange, resetField]
    );

    React.useEffect(() => {
        if (strategyFieldValue) {
            switch (strategyFieldValue) {
                case CODEBASE_CREATION_STRATEGIES['CREATE']:
                    resetFields([
                        names.gitUrlPath.name,
                        names.repositoryUrl.name,
                        names.hasCodebaseAuth.name,
                        names.repositoryLogin.name,
                        names.repositoryPasswordOrApiToken.name,
                    ]);
                    break;

                case CODEBASE_CREATION_STRATEGIES['CLONE']:
                    resetFields([names.gitUrlPath.name]);
                    resetField(names.emptyProject.name);
                    handleFormFieldChange({
                        name: names.emptyProject.name,
                        value: false,
                    });
                    break;

                case CODEBASE_CREATION_STRATEGIES['IMPORT']:
                    resetFields([
                        names.repositoryUrl.name,
                        names.hasCodebaseAuth.name,
                        names.repositoryLogin.name,
                        names.repositoryPasswordOrApiToken.name,
                    ]);
                    resetField(names.emptyProject.name);
                    handleFormFieldChange({
                        name: names.emptyProject.name,
                        value: false,
                    });
                    break;
            }
        }
    }, [strategyFieldValue, names, resetField, handleFormFieldChange, resetFields]);
};
