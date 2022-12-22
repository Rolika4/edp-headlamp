import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormCheckbox, FormControlLabelWithTooltip } from '../../../FormComponents';
import { EmptyProjectProps } from './types';

export const EmptyProject = ({ names, handleFormFieldChange }: EmptyProjectProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormCheckbox
            {...register(names.emptyProject.name, {
                onChange: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={
                <FormControlLabelWithTooltip
                    label={'Empty project'}
                    title={
                        'An empty project does not contain any template code. However, EDP pipelines and deployment templates will be created'
                    }
                />
            }
            control={control}
            errors={errors}
        />
    );
};
