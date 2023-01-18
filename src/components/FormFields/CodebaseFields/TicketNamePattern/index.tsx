import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { FormTextField } from '../../../FormComponents';
import { TicketNamePatternProps } from './types';

export const TicketNamePattern = ({ names, handleFormFieldChange }: TicketNamePatternProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormTextField
            {...register(names.ticketNamePattern.name, {
                required: 'Specify the pattern to find a Jira ticket number in a commit message',
                onBlur: ({ target: { name, value } }: FieldEvent) =>
                    handleFormFieldChange({ name, value }),
            })}
            label={'Specify the pattern to find a Jira ticket number in a commit message'}
            placeholder={'PROJECT_NAME-\\d{4}'}
            control={control}
            errors={errors}
        />
    );
};
