import { CodebaseAdvancedInfoTable } from '../../components/CodebaseAdvancedInfoTable';
import { CodebaseBranchesList } from '../../components/CodebaseBranchesList';
import { CodebaseGeneralInfoTable } from '../../components/CodebaseGeneralInfoTable';
import { CodebaseMetadataTable } from '../../components/CodebaseMetadataTable';
import { ICONS } from '../../constants/icons';
import { streamCodebase } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, pluginLib, React, ReactRouter } from '../../plugin.globals';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { COMPONENTS_ROUTE_NAME } from '../../routes/names';
import { createRouteName } from '../../utils/routes/createRouteName';
import { CodebaseActions } from './components/CodebaseActions';
import { useStyles } from './styles';

const { Icon } = Iconify;
const { Typography, Button, Grid } = MuiCore;
const { useParams } = ReactRouter;
const {
    CommonComponents: { Link },
} = pluginLib;

export const EDPComponentDetails = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams<{
        namespace?: string;
        name?: string;
    }>();
    const [component, setComponent] = React.useState<EDPCodebaseKubeObjectInterface>(null);
    const [, setError] = React.useState<Error>(null);

    const handleStoreComponent = React.useCallback((component: EDPCodebaseKubeObjectInterface) => {
        setComponent(component);
    }, []);

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCodebase(name, namespace, handleStoreComponent, handleError);

        return () => cancelStream();
    }, [handleError, handleStoreComponent, name, namespace]);

    return (
        <ResourceActionListContextProvider>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={ICONS['ARROW_LEFT']} />}
                    size="small"
                    component={Link}
                    routeName={createRouteName(COMPONENTS_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {component && (
                    <div style={{ marginLeft: 'auto' }}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <CodebaseMetadataTable codebaseData={component} />
                            </Grid>
                            <Grid item>
                                <CodebaseActions codebase={component} />
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
            {component && (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8}>
                            <ResourceActionListContextProvider>
                                <CodebaseBranchesList codebaseData={component} />
                            </ResourceActionListContextProvider>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <CodebaseGeneralInfoTable codebaseData={component} />
                            <CodebaseAdvancedInfoTable kubeObjectData={component} />
                        </Grid>
                    </Grid>
                </>
            )}
        </ResourceActionListContextProvider>
    );
};
