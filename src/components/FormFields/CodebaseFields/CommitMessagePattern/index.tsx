import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { CommitMessagePatternProps } from './types';

export const CommitMessagePattern = ({
    names,
    handleFormFieldChange,
}: CommitMessagePatternProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.commitMessagePattern.name, {
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Specify the pattern to validate a commit message'}
            placeholder={'^\\[PROJECT_NAME-\\d{4}\\]:.*'}
            control={control}
            errors={errors}
        />
    );
};
