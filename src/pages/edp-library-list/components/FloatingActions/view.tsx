import { CreateCodebase } from '../../../../components/CreateCodebase';
import { CODEBASE_TYPE_LIBRARY } from '../../../../constants/codebaseTypes';
import { ICON_PLUS } from '../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { useStyles } from './styles';
import { FloatingActionsProps } from './types';

const { Fab } = MuiCore;
const { Icon } = Iconify;

export const FloatingActions = ({}: FloatingActionsProps): React.ReactElement => {
    const classes = useStyles();
    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    const onClose = React.useCallback(() => {
        setCreateDialogOpen(false);
    }, [setCreateDialogOpen]);
    return (
        <>
            <Fab
                aria-label="add"
                onClick={() => setCreateDialogOpen(true)}
                className={classes.floatingAddButton}
            >
                <Icon icon={ICON_PLUS} className={classes.floatingAddButtonIcon} />
            </Fab>
            <CreateCodebase
                type={CODEBASE_TYPE_LIBRARY}
                open={createDialogOpen}
                setOpen={setCreateDialogOpen}
                onClose={onClose}
            />
        </>
    );
};
