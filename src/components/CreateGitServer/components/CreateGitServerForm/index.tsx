import type { DialogProps } from '@material-ui/core/Dialog';
import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { createGitServerSecretInstance } from '../../../../configs/k8s-resource-instances/resources/secret';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { FieldEventTarget } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import {
    GitProvider,
    HostName,
    HTTPSPort,
    SSHPort,
    SSHPrivateKey,
    Token,
    UserName,
} from '../../../FormFields/GitServerFields';
import { Render } from '../../../Render';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
import { GIT_SERVER_NAMES, GIT_SERVER_SECRET_NAMES } from './names';
import { useStyles } from './styles';
import { CreateGitServerFormProps } from './types';

const { Button, Grid } = MuiCore;

const {
    CommonComponents: { EditorDialog },
} = pluginLib;

export const CreateGitServerForm = ({
    editorOpen,
    setEditorOpen,
    handleApply,
    setDialogOpen,
    isApplying,
}: CreateGitServerFormProps): React.ReactElement => {
    const classes = useStyles();

    const { baseDefaultValues } = useDefaultValues({ names: GIT_SERVER_NAMES });

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPGitServerKubeObjectInterface>>(baseDefaultValues);

    const methods = useForm({
        defaultValues: baseDefaultValues,
    });

    const {
        handleSubmit,
        reset,
        resetField,
        formState: { isDirty },
        setValue,
    } = methods;

    const handleFormFieldChange = React.useCallback(({ name, value }: FieldEventTarget) => {
        setFormValues(prev => {
            if (Object.hasOwn(GIT_SERVER_NAMES[name], 'notUsedInFormData')) {
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
        names: GIT_SERVER_NAMES,
        setValue,
        handleFormFieldChange,
        formValues,
        resetField,
    });

    const { editorReturnValues } = useEditorCode({
        names: GIT_SERVER_NAMES,
        formValues,
    });

    const onEditorSave = React.useCallback(
        (editorPropsObject: EDPGitServerKubeObjectInterface) => {
            handleEditorSave(editorPropsObject);
            setEditorOpen(false);
        },
        [handleEditorSave, setEditorOpen]
    );

    const muDialogProps: DialogProps = {
        open: editorOpen,
    };

    const onSubmit = React.useCallback(
        ({ gitUser, sshPrivateKey, token }) => {
            const {
                metadata: { name },
            } = editorReturnValues;
            const sshPrivateKeyWithExtraLine = sshPrivateKey.trim() + '\n';

            const gitServerSecretInstance = createGitServerSecretInstance(GIT_SERVER_SECRET_NAMES, {
                name,
                gitUser: btoa(unescape(gitUser)),
                sshPrivateKey: btoa(unescape(sshPrivateKeyWithExtraLine)),
                token: btoa(unescape(token)),
            });

            handleApply(editorReturnValues, gitServerSecretInstance);
        },
        [editorReturnValues, handleApply]
    );

    return (
        <FormProvider {...methods}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInner}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <GitProvider
                                    handleFormFieldChange={handleFormFieldChange}
                                    names={GIT_SERVER_NAMES}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} style={{ display: 'flex' }}>
                                        <HostName
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                    <Grid item xs={6} style={{ display: 'flex' }}>
                                        <UserName
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} style={{ display: 'flex' }}>
                                        <SSHPort
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                    <Grid item xs={6} style={{ display: 'flex' }}>
                                        <HTTPSPort
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <Token
                                    handleFormFieldChange={handleFormFieldChange}
                                    names={GIT_SERVER_NAMES}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <SSHPrivateKey
                                    handleFormFieldChange={handleFormFieldChange}
                                    names={GIT_SERVER_NAMES}
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
                            disabled={!isDirty || isApplying}
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
