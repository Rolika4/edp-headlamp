import { ClassNameMap } from '@material-ui/styles';
import { EDPCodebaseSpecInterface } from '../../../k8s/EDPCodebase/types';
import { MuiCore, React } from '../../../plugin.globals';

const { Typography } = MuiCore;

export const useColumns = (codebaseSpec: EDPCodebaseSpecInterface, classes: ClassNameMap) =>
    React.useMemo(
        () => [
            {
                name: 'Language',
                value: codebaseSpec.lang,
            },
            {
                name: 'Empty Project',
                value: (
                    <Typography className={classes.statusLabel} component="span">
                        {codebaseSpec.emptyProject ? 'Yes' : 'No'}
                    </Typography>
                ),
            },
            {
                name: 'Build tool',
                value: codebaseSpec.buildTool,
            },
            {
                name: 'Framework',
                value: codebaseSpec.framework,
            },
            {
                name: 'Strategy',
                value: codebaseSpec.strategy,
            },
            {
                name: 'Default Branch',
                value: codebaseSpec.defaultBranch,
            },
        ],
        [codebaseSpec, classes]
    );
