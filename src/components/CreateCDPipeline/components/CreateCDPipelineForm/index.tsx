import { omit } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { KubeObjectInterface } from '../../../../plugin.types';
import { FieldEventTarget } from '../../../../types/forms';
import { CreateCDPipelineStage } from '../../../CreateCDPipelineStage';
import { Render } from '../../../Render';
import { ApplicationsFormPart } from './components/ApplicationsFormPart';
import { PipelineInfoFormPart } from './components/PipelineFormPart';
import { StagesFormPart } from './components/StagesFormPart';
import { TabPanel } from './components/TabPanel';
import {
    FORM_PART_APPLICATIONS,
    FORM_PART_PIPELINE,
    FORM_PART_STAGES,
    TAB_INDEXES,
} from './constants';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorReturnValues } from './hooks/useEditorCode';
import { CDPIPELINE_BACKWARDS_NAME_MAPPING, CDPIPELINE_CREATION_FORM_NAMES } from './names';
import { useStyles } from './styles';
import { CreateCDPipelineFormProps } from './types';

const { Tabs, Tab, Button } = MuiCore;

const {
    CommonComponents: { EditorDialog },
} = pluginLib;

const a11yProps = (index: any) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const TAB_INDEXES_LAST_INDEX = Object.keys(TAB_INDEXES).length - 1;

export const CreateCDPipelineForm = ({
    editorOpen,
    setEditorOpen,
    handleApply,
    setDialogOpen,
    isApplying,
}: CreateCDPipelineFormProps) => {
    const classes = useStyles();

    const [activeTabIdx, setActiveTabIdx] = React.useState<number>(TAB_INDEXES[FORM_PART_PIPELINE]);

    const { baseDefaultValues } = useDefaultValues({ names: CDPIPELINE_CREATION_FORM_NAMES });

    const [formValues, setFormValues] =
        React.useState<EDPCDPipelineKubeObjectInterface>(baseDefaultValues);
    const [stages, setStages] = React.useState<EDPCDPipelineStageKubeObjectInterface[]>([]);

    const handleChangeTab = React.useCallback(
        (event: React.ChangeEvent<{}>, newActiveTabIdx: number) => {
            setActiveTabIdx(newActiveTabIdx);
        },
        []
    );

    const methods = useForm({
        defaultValues: baseDefaultValues,
    });

    const {
        handleSubmit,
        reset,
        resetField,
        formState: { isDirty },
        trigger,
        setValue,
    } = methods;

    const getFirstErrorTabName = React.useCallback(errors => {
        const [firstErrorFieldName] = Object.keys(errors);
        return CDPIPELINE_CREATION_FORM_NAMES[firstErrorFieldName].formPart;
    }, []);

    const handleFormFieldChange = React.useCallback(({ name, value }: FieldEventTarget) => {
        setFormValues(prev => {
            if (Object.hasOwn(CDPIPELINE_CREATION_FORM_NAMES[name], 'notUsedInFormData')) {
                return prev;
            }

            if (value === undefined) {
                return omit(prev, name) as EDPCDPipelineKubeObjectInterface;
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
        setStages([]);
    }, [baseDefaultValues, reset]);

    const { handleEditorSave } = useHandleEditorSave({
        names: CDPIPELINE_CREATION_FORM_NAMES,
        backwardNames: CDPIPELINE_BACKWARDS_NAME_MAPPING,
        setValue,
        handleFormFieldChange,
        formValues,
        resetField,
    });

    const { editorReturnValues } = useEditorReturnValues({
        names: CDPIPELINE_CREATION_FORM_NAMES,
        formValues,
    });

    const onEditorSave = React.useCallback(
        (editorReturnValues: EDPCDPipelineKubeObjectInterface) => {
            handleEditorSave(editorReturnValues);
            setEditorOpen(false);
        },
        [handleEditorSave, setEditorOpen]
    );

    const handleValidationError = React.useCallback(
        (errors: Object) => {
            if (errors) {
                const firstErrorTabName = getFirstErrorTabName(errors);
                setActiveTabIdx(TAB_INDEXES[firstErrorTabName]);
            }
        },
        [getFirstErrorTabName]
    );

    const activeTabFormPartName = React.useMemo(() => {
        const [validEntry] = Object.entries(TAB_INDEXES).filter(([, idx]) => idx === activeTabIdx);
        const [activeTabName] = validEntry;

        return activeTabName;
    }, [activeTabIdx]);

    const handleProceed = React.useCallback(async () => {
        const activeTabFormPartNames = Object.values(CDPIPELINE_CREATION_FORM_NAMES)
            .filter(({ formPart }) => formPart === activeTabFormPartName)
            .map(({ name }) => name);
        const hasNoErrors = await trigger(activeTabFormPartNames);
        if (hasNoErrors) {
            setActiveTabIdx(activeTabIdx + 1);
        }
    }, [activeTabFormPartName, activeTabIdx, trigger]);

    const onSubmit = React.useCallback(() => {
        handleApply({
            CDPipelineData: editorReturnValues,
            CDPipelineStagesData: stages,
        });
    }, [editorReturnValues, handleApply, stages]);

    const [createStageDialogOpen, setCreateStageDialogOpen] = React.useState<boolean>(false);

    const onClose = React.useCallback(
        (_?, reason?: string) => {
            if (reason === 'backdropClick') {
                return;
            }

            setCreateStageDialogOpen(false);
        },
        [setCreateStageDialogOpen]
    );

    const handleCreateNewStage = React.useCallback(
        ({
            CDPipelineStageData,
        }: {
            CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
        }) => {
            setStages(prev => [...prev, CDPipelineStageData]);
            onClose();
        },
        [onClose]
    );

    const onStageDelete = React.useCallback((idx: number) => {
        setStages(prev =>
            prev
                .map((el, prevElIndex) => {
                    if (idx !== prevElIndex) {
                        return el;
                    }
                })
                .filter(Boolean)
        );
    }, []);

    const onPipelineNameChange = React.useCallback(
        pipelineNameFieldValue => {
            if (!stages.length) {
                return;
            }

            const updatedStagesWithNewPipelineName = stages.map(el => ({
                ...el,
                metadata: {
                    ...el.metadata,
                    name: `${pipelineNameFieldValue}-${el.spec.name}`,
                },
                spec: {
                    ...el.spec,
                    cdPipeline: pipelineNameFieldValue,
                },
            }));

            setStages(updatedStagesWithNewPipelineName);
        },
        [stages]
    );

    return (
        <FormProvider {...methods}>
            <Tabs
                orientation="vertical"
                value={activeTabIdx}
                onChange={handleChangeTab}
                aria-label="simple tabs example"
                indicatorColor={'primary'}
                textColor={'primary'}
                className={classes.tabs}
            >
                <Tab label="Pipeline" {...a11yProps(TAB_INDEXES[FORM_PART_PIPELINE])} />
                <Tab label={`Applications`} {...a11yProps(TAB_INDEXES[FORM_PART_APPLICATIONS])} />
                <Tab label="Stages" {...a11yProps(TAB_INDEXES[FORM_PART_STAGES])} />
            </Tabs>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit, handleValidationError)}>
                    <div className={classes.formInner}>
                        <TabPanel
                            value={activeTabIdx}
                            index={TAB_INDEXES[FORM_PART_PIPELINE]}
                            className={classes.tabPanel}
                        >
                            <div className={classes.tabPanelInner}>
                                <PipelineInfoFormPart
                                    names={CDPIPELINE_CREATION_FORM_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                    onPipelineNameChange={onPipelineNameChange}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel
                            value={activeTabIdx}
                            index={TAB_INDEXES[FORM_PART_APPLICATIONS]}
                            className={classes.tabPanel}
                        >
                            <div className={classes.tabPanelInner}>
                                <ApplicationsFormPart
                                    names={CDPIPELINE_CREATION_FORM_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel
                            value={activeTabIdx}
                            index={TAB_INDEXES[FORM_PART_STAGES]}
                            className={classes.tabPanel}
                        >
                            <div className={classes.tabPanelInner}>
                                <StagesFormPart
                                    setCreateStageDialogOpen={setCreateStageDialogOpen}
                                    stages={stages}
                                    onStageDelete={onStageDelete}
                                />
                            </div>
                        </TabPanel>
                    </div>
                    <div className={classes.tabPanelActions}>
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
                        <Render condition={activeTabIdx < TAB_INDEXES_LAST_INDEX}>
                            <Button
                                onClick={handleProceed}
                                variant={'contained'}
                                color={'primary'}
                                size="small"
                            >
                                proceed
                            </Button>
                        </Render>
                        <Render condition={activeTabIdx === TAB_INDEXES_LAST_INDEX}>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                size="small"
                                disabled={!isDirty || isApplying || !stages.length}
                            >
                                apply
                            </Button>
                        </Render>
                    </div>
                </form>
                <CreateCDPipelineStage
                    CDPipelineData={editorReturnValues}
                    otherStages={stages}
                    open={createStageDialogOpen}
                    onClose={onClose}
                    setOpen={setCreateStageDialogOpen}
                    handleApply={handleCreateNewStage}
                    isApplying={isApplying}
                />
            </div>
            <Render condition={!!editorOpen}>
                <EditorDialog
                    open={editorOpen}
                    item={editorReturnValues as unknown as KubeObjectInterface}
                    onClose={() => setEditorOpen(false)}
                    onSave={onEditorSave}
                />
            </Render>
        </FormProvider>
    );
};
