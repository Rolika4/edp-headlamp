import { InputAdornment } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

// relative path should always start with slash

const slashSymbol = '/';

export const GitUrlPath = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<CreateCodebaseFormValues>();

  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

  const title =
    gitServerFieldValue === GIT_SERVERS.GITLAB
      ? 'Specify the codebase repository name in the following format: username/repository_name.'
      : 'Specify the codebase repository name.';

  const placeholder =
    gitServerFieldValue === GIT_SERVERS.GERRIT
      ? 'repository_name'
      : 'username_or_organization/repository_name';

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.gitUrlPath.name, {
        required: 'Enter relative path to repository.',
        pattern: {
          value: /^.*$/,
          message: 'Enter valid relative path to repository',
        },
      })}
      label={'Repository name'}
      title={title}
      placeholder={placeholder}
      control={control}
      errors={errors}
      InputProps={{
        startAdornment: <InputAdornment position="start">{slashSymbol}</InputAdornment>,
      }}
    />
  );
};
