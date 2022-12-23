import type { DialogProps } from '@material-ui/core/Dialog';
import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { CI_TOOLS } from '../../../../constants/ciTools';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { useNamespace } from '../../../../hooks/useNamespace';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { FieldEventTarget } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import {
    Description,
    GroovyPipelineLibrary,
    JobProvisioner,
    QualityGates,
    StageName,
    TriggerType,
} from '../../../FormFields/CDPipelineStageFields';
import { Render } from '../../../Render';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
import { CDPIPELINE_STAGE_BACKWARDS_NAME_MAPPING, CDPIPELINE_STAGE_NAMES } from './names';
import { useStyles } from './styles';
import { CreateCDPipelineStageFormProps } from './types';

const { Button, Grid } = MuiCore;

const {
    CommonComponents: { EditorDialog },
} = pluginLib;

export const CreateCDPipelineStageForm = ({
    availableCITools,
    CDPipelineData,
    otherStages,
    editorOpen,
    setEditorOpen,
    handleApply,
    setDialogOpen,
    isApplying,
}: CreateCDPipelineStageFormProps): React.ReactElement => {
    const classes = useStyles();
    const { namespace } = useNamespace();

    const { baseDefaultValues } = useDefaultValues({
        names: CDPIPELINE_STAGE_NAMES,
        stagesQuantity: otherStages.length,
    });

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPCDPipelineStageKubeObjectInterface>>(baseDefaultValues);

    const methods = useForm({
        defaultValues: baseDefaultValues,
    });

    const {
        handleSubmit,
        reset,
        resetField,
        formState: { isDirty },
        setValue,
        watch,
    } = methods;

    const handleFormFieldChange = React.useCallback(({ name, value }: FieldEventTarget) => {
        setFormValues(prev => {
            if (Object.hasOwn(CDPIPELINE_STAGE_NAMES[name], 'notUsedInFormData')) {
                return prev;
            }

            if (value === undefined) {
                return lodashOmit(prev, name);
            }

            return {
                ...prev,
                [name]: value,
            };
        });
    }, []);

    const handleResetFields = React.useCallback(() => {
        setFormValues(baseDefaultValues);
        reset();
    }, [baseDefaultValues, reset]);

    const { handleEditorSave } = useHandleEditorSave({
        names: CDPIPELINE_STAGE_NAMES,
        backwardNames: CDPIPELINE_STAGE_BACKWARDS_NAME_MAPPING,
        setValue,
        handleFormFieldChange,
        formValues,
        resetField,
    });

    const { editorReturnValues } = useEditorCode({
        names: CDPIPELINE_STAGE_NAMES,
        formValues,
        CDPipelineData,
    });

    const onEditorSave = React.useCallback(
        (editorPropsObject: EDPCodebaseBranchKubeObjectInterface) => {
            handleEditorSave(editorPropsObject);
            setEditorOpen(false);
        },
        [handleEditorSave, setEditorOpen]
    );

    const muDialogProps: DialogProps = {
        open: editorOpen,
    };

    const onSubmit = React.useCallback(() => {
        handleApply(editorReturnValues);
    }, [editorReturnValues, handleApply]);

    const hasJenkinsCITool = React.useMemo(
        () => availableCITools.includes(CI_TOOLS['JENKINS']),
        [availableCITools]
    );

    const qualityGatesFieldValue = watch(CDPIPELINE_STAGE_NAMES.qualityGates.name);

    const otherStagesNames = React.useMemo(
        () => otherStages.map(({ spec: { name } }) => name),
        [otherStages]
    );

    return (
        <FormProvider {...methods}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInner}>
                        <Grid container spacing={2} alignItems={'flex-end'}>
                            <Grid item xs={6}>
                                <StageName
                                    names={CDPIPELINE_STAGE_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                    otherStagesNames={otherStagesNames}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Description
                                    names={CDPIPELINE_STAGE_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TriggerType
                                    names={CDPIPELINE_STAGE_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </Grid>
                            <Render condition={hasJenkinsCITool}>
                                <>
                                    <Grid item xs={6}>
                                        <JobProvisioner
                                            names={CDPIPELINE_STAGE_NAMES}
                                            handleFormFieldChange={handleFormFieldChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <GroovyPipelineLibrary
                                            names={CDPIPELINE_STAGE_NAMES}
                                            namespace={namespace}
                                            handleFormFieldChange={handleFormFieldChange}
                                        />
                                    </Grid>
                                </>
                            </Render>
                            <Grid item xs={12}>
                                <QualityGates
                                    namespace={namespace}
                                    names={CDPIPELINE_STAGE_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.actions}>
                        <Button
                            onClick={handleResetFields}
                            size="small"
                            component={'button'}
                            disabled={!isDirty}
                        >
                            undo changes
                        </Button>
                        <Button
                            onClick={() => setDialogOpen(false)}
                            size="small"
                            component={'button'}
                            style={{ marginLeft: 'auto' }}
                        >
                            cancel
                        </Button>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            size="small"
                            disabled={
                                !isDirty ||
                                isApplying ||
                                !qualityGatesFieldValue ||
                                !qualityGatesFieldValue.length
                            }
                        >
                            apply
                        </Button>
                    </div>
                </form>
            </div>
            <Render condition={!!editorOpen}>
                <EditorDialog
                    {...muDialogProps}
                    item={editorReturnValues}
                    onClose={() => setEditorOpen(false)}
                    onSave={onEditorSave}
                />
            </Render>
        </FormProvider>
    );
};
