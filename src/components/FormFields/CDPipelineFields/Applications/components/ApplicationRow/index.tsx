import { useFormContext } from 'react-hook-form';
import { ICONS } from '../../../../../../constants/icons';
import { Iconify, MuiCore, MuiStyles, React } from '../../../../../../plugin.globals';
import { FieldEvent, FieldEventTarget } from '../../../../../../types/forms';
import { FormSelect } from '../../../../../FormComponents';
import {
    FormCheckbox,
    FormControlLabelWithTooltip,
    FormTextField,
} from '../../../../../FormComponents';
import { createApplicationRowName } from '../../constants';
import { useStyles } from './styles';
import { ApplicationRowProps } from './types';

const { Grid, Button } = MuiCore;
const { Icon } = Iconify;
const { useTheme } = MuiStyles;

export const ApplicationRow = ({
    names,
    application,
    setApplications,
    handleFormFieldChange,
}: ApplicationRowProps) => {
    const classes = useStyles();

    const {
        register,
        control,
        formState: { errors },
        resetField,
        setValue,
    } = useFormContext();

    const { value, availableBranches } = application;

    const theme: DefaultTheme = useTheme();

    const handleChangeApplicationBranch = React.useCallback(
        ({ value: targetValue }: FieldEventTarget) => {
            setApplications(prev => {
                const newApplications = prev.map(app => {
                    if (app.value === value) {
                        return {
                            ...app,
                            chosenBranch: targetValue,
                        };
                    }
                    return app;
                });

                const pipelineApplicationBranches = newApplications
                    .filter(el => el.isUsed)
                    .map(el => el.chosenBranch);

                handleFormFieldChange({
                    name: names.inputDockerStreams.name,
                    value: pipelineApplicationBranches,
                });

                setValue(names.inputDockerStreams.name, pipelineApplicationBranches, {
                    shouldDirty: true,
                });

                return newApplications;
            });
        },
        [handleFormFieldChange, names.inputDockerStreams.name, setApplications, setValue, value]
    );

    const handleChangeApplicationToPromote = React.useCallback(
        ({ value: targetValue }: FieldEventTarget) => {
            setApplications(prev => {
                const newApplications = prev.map(app => {
                    if (app.value === value) {
                        return {
                            ...app,
                            toPromote: targetValue,
                        };
                    }
                    return app;
                });

                const pipelineApplicationsToPromote = newApplications
                    .filter(el => el.isUsed && el.toPromote)
                    .map(el => el.value);

                handleFormFieldChange({
                    name: names.applicationsToPromote.name,
                    value: pipelineApplicationsToPromote,
                });

                setValue(names.applicationsToPromote.name, pipelineApplicationsToPromote, {
                    shouldDirty: true,
                });

                return newApplications;
            });
        },
        [handleFormFieldChange, names.applicationsToPromote.name, setApplications, setValue, value]
    );

    const handleDeleteApplicationRow = React.useCallback(() => {
        setApplications(prev => {
            const newApplications = prev.map(app => {
                if (app.value === value) {
                    return {
                        label: app.label,
                        value: app.value,
                        availableBranches: app.availableBranches,
                        isUsed: false,
                        chosenBranch: null,
                        toPromote: false,
                    };
                }
                return app;
            });

            const pipelineApplications = newApplications
                .filter(el => el.isUsed)
                .map(el => el.value);

            handleFormFieldChange({
                name: names.applications.name,
                value: pipelineApplications,
            });

            setValue(names.applications.name, pipelineApplications, {
                shouldDirty: true,
            });

            const pipelineApplicationBranches = newApplications
                .filter(el => el.isUsed)
                .map(el => el.chosenBranch);

            handleFormFieldChange({
                name: names.inputDockerStreams.name,
                value: pipelineApplicationBranches,
            });

            setValue(names.inputDockerStreams.name, pipelineApplicationBranches, {
                shouldDirty: true,
            });

            const pipelineApplicationsToPromote = newApplications
                .filter(el => el.isUsed && el.toPromote)
                .map(el => el.value);

            handleFormFieldChange({
                name: names.applicationsToPromote.name,
                value: pipelineApplicationsToPromote,
            });

            setValue(names.applicationsToPromote.name, pipelineApplicationsToPromote, {
                shouldDirty: true,
            });

            return newApplications;
        });

        resetField(`${createApplicationRowName(value)}-application-name`);
        resetField(`${createApplicationRowName(value)}-application-branch`);
        resetField(`${createApplicationRowName(value)}-application-promote`);
    }, [
        handleFormFieldChange,
        names.applications.name,
        names.applicationsToPromote.name,
        names.inputDockerStreams.name,
        resetField,
        setApplications,
        setValue,
        value,
    ]);

    return (
        <Grid item xs={12} className={classes.application}>
            <Grid container spacing={1} alignItems={'flex-end'}>
                <Grid item xs={4}>
                    <FormTextField
                        {...register(`${createApplicationRowName(value)}-application-name`, {})}
                        disabled
                        defaultValue={value}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormSelect
                        {...register(`${createApplicationRowName(value)}-application-branch`, {
                            required: 'Select branch',
                            onChange: ({ target: { name, value } }: FieldEvent) =>
                                handleChangeApplicationBranch({ name, value }),
                        })}
                        placeholder={'Select application branch'}
                        control={control}
                        errors={errors}
                        options={availableBranches.map(el => ({
                            label: el.specBranchName,
                            value: el.metadataBranchName,
                        }))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormCheckbox
                        {...register(`${createApplicationRowName(value)}-application-promote`, {
                            onChange: ({ target: { name, value } }: FieldEvent) =>
                                handleChangeApplicationToPromote({ name, value }),
                        })}
                        label={<FormControlLabelWithTooltip label={'Promote in pipeline'} />}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid
                    item
                    xs={1}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                    }}
                >
                    <Button
                        type={'button'}
                        size={'small'}
                        component={'button'}
                        style={{ minWidth: 0 }}
                        onClick={handleDeleteApplicationRow}
                    >
                        <Icon icon={ICONS['BUCKET']} width={20} color={theme.palette.grey['500']} />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
