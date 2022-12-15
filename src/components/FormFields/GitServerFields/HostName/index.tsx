import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { HostNameProps } from './types';

export const HostName = ({ names, handleFormFieldChange }: HostNameProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.gitHost.name, {
                required: 'Enter host name',
                pattern: {
                    value: /^([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/,
                    message: 'Enter correct host name',
                },
                onChange: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Host'}
            placeholder={'host-name.com'}
            control={control}
            errors={errors}
        />
    );
};
