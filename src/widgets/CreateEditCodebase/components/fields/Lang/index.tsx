import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_COMMON_LANGUAGES } from '../../../../../configs/codebase-mappings';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../../constants/creationStrategies';
import { UseSpriteSymbol } from '../../../../../icons/UseSpriteSymbol';
import { FormRadioGroup } from '../../../../../providers/Form/components/FormRadioGroup';
import { FormRadioOption } from '../../../../../providers/Form/components/FormRadioGroup/types';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const Lang = () => {
    const {
        unregister,
        register,
        control,
        formState: { errors },
        resetField,
        watch,
    } = useFormContext<CreateCodebaseFormValues>();

    const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
    const strategyValue = watch(CODEBASE_FORM_NAMES.strategy.name);

    const langOptions = React.useMemo(() => {
        const codebaseMapping = getCodebaseMappingByCodebaseType(typeFieldValue);

        const resultOptions: FormRadioOption[] = [];

        if (!codebaseMapping) {
            return resultOptions;
        }

        for (const mapping of Object.values(codebaseMapping)) {
            const {
                language: { name, value, icon },
            } = mapping;
            resultOptions.push({
                value,
                label: name,
                icon: <UseSpriteSymbol name={icon} width={20} height={20} />,
                checkedIcon: <UseSpriteSymbol name={icon} width={20} height={20} />,
                disabled:
                    value === CODEBASE_COMMON_LANGUAGES.OTHER &&
                    strategyValue === CODEBASE_CREATION_STRATEGIES.CREATE,
            });
        }

        return resultOptions;
    }, [strategyValue, typeFieldValue]);

    const onLangChange = React.useCallback(async () => {
        resetField(CODEBASE_FORM_NAMES.framework.name);
        resetField(CODEBASE_FORM_NAMES.buildTool.name);
        unregister(CODEBASE_FORM_NAMES.framework.name);
    }, [resetField, unregister]);

    return (
        <FormRadioGroup
            {...register(CODEBASE_FORM_NAMES.lang.name, {
                required: `Select codebase language`,
                onChange: onLangChange,
            })}
            control={control}
            errors={errors}
            label={'Specify the primary programming language used in your component.'}
            options={langOptions}
        />
    );
};
