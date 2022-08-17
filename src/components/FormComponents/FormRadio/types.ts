import { Control } from 'react-hook-form/dist/types';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

export interface FormRadioOption {
    value: string;
    label: string;
    icon: React.ReactElement;
    checkedIcon: React.ReactElement;
}

export interface FormRadioProps {
    name: string;
    control: Control;
    errors: FieldErrors;
    label: string;
    title: string;
    options: FormRadioOption[];
}
