/**
 * @jest-environment jsdom
 */

import { describe, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { DeleteKubeObject } from './index';
import { DeleteKubeObjectProps } from './types';

describe('DeleteKubeObject', () => {
    test('renders correctly', () => {
        const props: DeleteKubeObjectProps = {
            popupOpen: true,
            setPopupOpen: () => {},
            kubeObject: null,
            kubeObjectData: {
                apiVersion: 'apiextensions.k8s.io/v1',
                kind: 'CustomResourceDefinition',
                metadata: {
                    name: 'TestCustomResourceDefinition',
                    namespace: 'best-namespace-ever',
                    finalizers: [],
                    generation: 1,
                    uid: '',
                    creationTimestamp: new Date().toISOString(),
                    resourceVersion: 'unknown',
                    selfLink: '',
                },
            },
            objectName: 'super-cool-object-name',
            description: 'Confirmation message for test action',
            onBeforeSubmit: () => Promise.resolve(),
        };
        const store = configureStore({
            reducer: () => ({}),
        });

        render(
            <Provider store={store}>
                <SnackbarProvider>
                    <DeleteKubeObject {...props} />
                </SnackbarProvider>
            </Provider>
        );

        expect(screen.getByRole('dialog')).toMatchSnapshot();
    });
});
