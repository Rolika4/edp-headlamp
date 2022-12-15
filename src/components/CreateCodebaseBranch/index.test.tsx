/**
 * @jest-environment jsdom
 */

import { describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { CreateCodebaseBranch } from './index';
import { CreateCodebaseBranchProps } from './types';

describe('CreateCodebaseBranch', () => {
    it('should render correctly', async () => {
        const props: CreateCodebaseBranchProps = {
            codebaseData: {
                apiVersion: 'apiVersion',
                kind: 'Codebase',
                metadata: {
                    name: 'test-app-name',
                    namespace: 'test-namespace',
                },
                spec: {
                    defaultBranch: 'test-default-branch',
                    versioning: {
                        type: 'edp',
                        startFrom: '0.0.0-SNAPSHOT',
                    },
                },
            },
            open: true,
            setOpen: () => {},
            onClose: () => {},
            handleApply: () => {},
            isApplying: false,
        };
        const store = configureStore({
            reducer: () => ({}),
        });

        render(
            <Provider store={store}>
                <SnackbarProvider>
                    <CreateCodebaseBranch {...props} />
                </SnackbarProvider>
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByTestId('create-codebase-branch')).toMatchSnapshot();
        });
    });
});
