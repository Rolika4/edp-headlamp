import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { ECR_REGISTRY_FORM_NAMES } from '../../../names';

export const RegistrySpace = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(ECR_REGISTRY_FORM_NAMES.registrySpace.name)}
            label={`Registry Space`}
            control={control}
            errors={errors}
        />
    );
};