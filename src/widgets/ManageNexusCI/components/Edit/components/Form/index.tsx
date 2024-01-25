import { Grid } from '@mui/material';
import { Alert } from '@mui/material';
import React from 'react';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { ManageNexusIntegrationSecretFormDataContext } from '../../../../types';
import { ExternalURL, Password, URL, User } from '../../../fields';

export const Form = () => {
  const {
    formData: { ownerReference, nexusEDPComponent },
  } = useFormContext<ManageNexusIntegrationSecretFormDataContext>();

  return (
    <Grid container spacing={2}>
      {!nexusEDPComponent && (
        <Grid item xs={12}>
          <Alert severity="info" variant="outlined">
            Nexus EDPComponent has not been found. Please, create it first in order to manage the
            integration.
          </Alert>
        </Grid>
      )}
      {ownerReference && (
        <Grid item xs={12}>
          <Alert severity="info" variant="outlined">
            Managed by {ownerReference}
          </Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <ExternalURL />
      </Grid>
      <Grid item xs={12}>
        <URL />
      </Grid>
      <Grid item xs={6}>
        <User />
      </Grid>
      <Grid item xs={6}>
        <Password />
      </Grid>
    </Grid>
  );
};
