/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { SYSTEM_QUICK_LINKS } from '../../k8s/QuickLink/constants';
import { ArgoCDCISecretWithOwnerMock } from '../../k8s/Secret/mocks/argo-cd-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES } from '../../types/forms';
import { ManageArgoCDCI } from './index';

test('renders ManageArgoCDCI Edit component (read-only)', () => {
  const ownerReference = ArgoCDCISecretWithOwnerMock.metadata.ownerReferences[0].kind;

  render(
    <TestWrapper>
      <ManageArgoCDCI
        formData={{
          argoCDSecret: ArgoCDCISecretWithOwnerMock as unknown as SecretKubeObjectInterface,
          ownerReference: ownerReference,
          argoCDQuickLink: {
            apiVersion: 'v1.edp.epam.com/v1',
            kind: 'QuickLink',
            metadata: {
              name: SYSTEM_QUICK_LINKS.ARGOCD,
              namespace: 'test-namespace',
              creationTimestamp: '',
              uid: '',
            },
            spec: {
              type: SYSTEM_QUICK_LINKS.ARGOCD,
              url: 'https://test-nexus.com',
              visible: true,
              icon: '',
            },
            status: '',
          },
          mode: FORM_MODES.EDIT,
          handleClosePanel: jest.fn(),
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
