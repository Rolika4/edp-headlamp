import { Icon } from '@iconify/react';
import { Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { Form } from './components/Form';
import { CredentialsFormProps } from './types';

export const CredentialsForm = ({ gitServerSecret }: CredentialsFormProps) => {
  const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h6'}>Credentials</Typography>
          </Grid>
          {!!gitServerSecretOwnerReference && (
            <Grid item>
              <Tooltip title={`Managed by ${gitServerSecretOwnerReference}`}>
                <Icon
                  icon={ICONS.CLOUD_LOCK}
                  width={20}
                  style={{
                    display: 'block',
                  }}
                />
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Form />
      </Grid>
    </Grid>
  );
};
