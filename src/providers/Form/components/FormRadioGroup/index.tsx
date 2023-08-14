import { ErrorMessage } from '@hookform/error-message';
import {
    ButtonBase,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Render } from '../../../../components/Render';
import { FormControlLabelWithTooltip } from '../FormControlLabelWithTooltip';
import { useStyles } from './styles';
import { FormRadioProps } from './types';

export const FormRadioGroup = React.forwardRef(
    (
        {
            name,
            control,
            errors,
            label,
            title,
            options,
            disabled = false,
            ...props
        }: FormRadioProps,
        ref: React.RefObject<HTMLInputElement>
    ) => {
        const hasError = !!errors[name];
        const classes = useStyles();

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} style={{ display: 'flex' }}>
                    <FormControl>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <FormControlLabelWithTooltip label={label} title={title} />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    render={({ field }) => (
                                        <RadioGroup {...field} row className={classes.radioGroup}>
                                            {options.map(
                                                (
                                                    {
                                                        value,
                                                        label,
                                                        icon,
                                                        checkedIcon,
                                                        disabled: optionDisabled,
                                                    },
                                                    idx
                                                ) => {
                                                    const isChecked = field.value === value;
                                                    const key = `${value}::${idx}`;

                                                    return (
                                                        <ButtonBase
                                                            key={key}
                                                            className={clsx(
                                                                classes.radioControlButton,
                                                                {
                                                                    [classes.radioControlButtonActive]:
                                                                        isChecked,
                                                                }
                                                            )}
                                                            disabled={disabled || optionDisabled}
                                                        >
                                                            <FormControlLabel
                                                                value={value}
                                                                control={
                                                                    <Radio
                                                                        color={'primary'}
                                                                        checked={isChecked}
                                                                        icon={icon}
                                                                        checkedIcon={checkedIcon}
                                                                        disableRipple
                                                                        inputRef={ref}
                                                                    />
                                                                }
                                                                disabled={
                                                                    disabled || optionDisabled
                                                                }
                                                                label={label}
                                                                className={
                                                                    classes.radioControlLabel
                                                                }
                                                            />
                                                        </ButtonBase>
                                                    );
                                                }
                                            )}
                                        </RadioGroup>
                                    )}
                                    control={control}
                                    name={name}
                                    {...props}
                                />
                            </Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                <Render condition={hasError}>
                    <Grid item xs={12}>
                        <Typography component={'span'} variant={'subtitle2'} color={'error'}>
                            <ErrorMessage errors={errors} name={name} />
                        </Typography>
                    </Grid>
                </Render>
            </Grid>
        );
    }
);
