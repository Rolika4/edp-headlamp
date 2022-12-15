import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary';
import { Applications } from '../../../../../FormFields/CDPipelineFields';
import { ApplicationsFormPartProps } from './types';

const { Grid } = MuiCore;

export const ApplicationsFormPart = ({
    names,
    handleFormFieldChange,
}: ApplicationsFormPartProps): React.ReactElement => {
    return (
        <ErrorBoundary>
            <Grid container spacing={3}>
                <Applications names={names} handleFormFieldChange={handleFormFieldChange} />
            </Grid>
        </ErrorBoundary>
    );
};
