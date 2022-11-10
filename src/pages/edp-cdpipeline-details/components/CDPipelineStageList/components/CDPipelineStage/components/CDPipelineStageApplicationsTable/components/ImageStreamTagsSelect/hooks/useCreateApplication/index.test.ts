/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { ApplicationKubeObject } from '../../../../../../../../../../../../k8s/Application';
import { pluginLib } from '../../../../../../../../../../../../plugin.globals';
import { useCreateApplication } from './index';
import { applicationMock } from './mocks/application.mock';
import { gerritsMock } from './mocks/gerrits.mock';

const { ApiProxy } = pluginLib;

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

ApplicationKubeObject.apiEndpoint.post = jest.fn().mockImplementation(() => {});

beforeEach(() => {
    jest.spyOn(global.window.crypto, 'getRandomValues').mockReturnValue(
        new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584])
    );
});

afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing useCreateApplication hook', () => {
    it('should successfully create Application resource', async () => {
        let applicationCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            applicationCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };

        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('gerrits')) {
                return Promise.resolve(gerritsMock);
            }
        });

        const applicationPostRequestSpy = jest
            .spyOn(ApplicationKubeObject.apiEndpoint, 'post')
            .mockResolvedValue(applicationMock);

        const {
            result: {
                current: { createApplication },
            },
        } = renderHook(() => useCreateApplication(onCreate, onError));

        const createApplicationPromise = createApplication({
            pipelineName: 'test-pipeline-name',
            stageName: 'test-stage-name',
            appName: 'test-app-name',
            imageName: 'test-image-name',
            imageTag: 'test-image-tag',
            namespace: 'test-namespace',
        });

        await expect(createApplicationPromise).resolves.toEqual(applicationMock);
        expect(applicationPostRequestSpy).toHaveBeenCalledWith(applicationMock);

        expect(applicationCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`shouldn't create Application if something goes wrong`, async () => {
        let applicationCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            applicationCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };

        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('gerrits')) {
                return Promise.resolve(gerritsMock);
            }
        });

        const applicationPostRequestSpy = jest
            .spyOn(ApplicationKubeObject.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure' });

        const {
            result: {
                current: { createApplication },
            },
        } = renderHook(() => useCreateApplication(onCreate, onError));

        const createApplicationPromise = createApplication({
            pipelineName: 'test-pipeline-name',
            stageName: 'test-stage-name',
            appName: 'test-app-name',
            imageName: 'test-image-name',
            imageTag: 'test-image-tag',
            namespace: 'test-namespace',
        });

        await expect(createApplicationPromise).rejects.toEqual({ status: 'Failure' });
        expect(applicationPostRequestSpy).toHaveBeenCalledWith(applicationMock);

        expect(applicationCreated).toBe(false);
        expect(hasError).toBe(true);
    });
});
