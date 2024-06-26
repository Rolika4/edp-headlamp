import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { VALIDATED_PROTOCOLS } from '../../../../../constants/validatedProtocols';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../../types/forms';
import { getValidURLPattern } from '../../../../../utils/checks/getValidURLPattern';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageNexusIntegrationSecretFormDataContext } from '../../../types';

export const ExternalURL = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useReactHookFormContext();

  const {
    formData: { mode, nexusQuickLink },
  } = useFormContext<ManageNexusIntegrationSecretFormDataContext>();

  return (
    <FormTextField
      {...register(NEXUS_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name, {
        required: 'Enter the external Nexus URL.',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOLS.STRICT_HTTPS),
          message: 'Enter a valid URL with HTTPS protocol.',
        },
        onChange: ({ target: { value } }) => {
          if (mode === FORM_MODES.EDIT) {
            return;
          }

          setValue(NEXUS_INTEGRATION_SECRET_FORM_NAMES.url.name, value);
        },
      })}
      label={'Quick Link URL'}
      title={'Enter the external URL of your Nexus instance.'}
      placeholder={'Enter URL'}
      control={control}
      errors={errors}
      disabled={!nexusQuickLink}
    />
  );
};
