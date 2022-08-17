import {
    APPLICATION_NAMES,
    AUTOTEST_NAMES,
    LIBRARY_NAMES,
} from '../../../components/CreateCodebase/components/CreateCodebaseForm/constants';
import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../components/CreateCodebase/constants';
import { createCodebaseExample } from './index';

describe('testing createCodebaseExample', () => {
    describe('codebase type: application', () => {
        it('should return valid kube object', () => {
            const object = createCodebaseExample(APPLICATION_NAMES, CODEBASE_TYPE_APPLICATION, {
                strategy: 'create',
                gitServer: 'gerrit',
                ciTool: 'jenkins',
                emptyProject: true,
                jenkinsSlave: 'gradle-java11',
                defaultBranch: 'master',
                lang: 'Java',
                framework: 'java11',
                buildTool: 'gradle',
                jobProvisioning: 'default',
                versioningType: 'edp',
                versioningStartFrom: '0.0.0-SNAPSHOT',
                deploymentScript: 'helm-chart',
                name: 'test',
                namespace: 'edp-delivery-vp-delivery-dev',
            });

            expect(object).toMatchObject({
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'Codebase',
                spec: {
                    type: 'application',
                    strategy: 'create',
                    gitServer: 'gerrit',
                    ciTool: 'jenkins',
                    emptyProject: true,
                    jenkinsSlave: 'gradle-java11',
                    defaultBranch: 'master',
                    lang: 'Java',
                    framework: 'java11',
                    buildTool: 'gradle',
                    jobProvisioning: 'default',
                    versioning: { type: 'edp', startFrom: '0.0.0-SNAPSHOT' },
                    deploymentScript: 'helm-chart',
                },
                metadata: { name: 'test', namespace: 'edp-delivery-vp-delivery-dev' },
            });
        });
    });
    describe('codebase type: library', () => {
        it('should return valid kube object', () => {
            const object = createCodebaseExample(LIBRARY_NAMES, CODEBASE_TYPE_LIBRARY, {
                strategy: 'create',
                gitServer: 'gerrit',
                ciTool: 'jenkins',
                emptyProject: true,
                jenkinsSlave: 'gradle-java11',
                defaultBranch: 'master',
                lang: 'Java',
                framework: 'java11',
                buildTool: 'gradle',
                jobProvisioning: 'default',
                versioningType: 'edp',
                versioningStartFrom: '0.0.0-SNAPSHOT',
                deploymentScript: 'helm-chart',
                name: 'test',
                namespace: 'edp-delivery-vp-delivery-dev',
            });

            expect(object).toMatchObject({
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'Codebase',
                spec: {
                    type: 'library',
                    strategy: 'create',
                    gitServer: 'gerrit',
                    ciTool: 'jenkins',
                    emptyProject: true,
                    jenkinsSlave: 'gradle-java11',
                    defaultBranch: 'master',
                    lang: 'Java',
                    framework: 'java11',
                    buildTool: 'gradle',
                    jobProvisioning: 'default',
                    versioning: { type: 'edp', startFrom: '0.0.0-SNAPSHOT' },
                    deploymentScript: 'helm-chart',
                },
                metadata: { name: 'test', namespace: 'edp-delivery-vp-delivery-dev' },
            });
        });
    });
    describe('codebase type: autotest', () => {
        it('should return valid kube object', () => {
            const object = createCodebaseExample(AUTOTEST_NAMES, CODEBASE_TYPE_AUTOTEST, {
                strategy: 'clone',
                gitServer: 'gerrit',
                ciTool: 'jenkins',
                jenkinsSlave: 'maven-java11',
                namespace: 'edp-delivery-vp-delivery-dev',
                name: 'test',
                repositoryUrl: 'https://github.com/kinvolk/headlamp.git',
                defaultBranch: 'master',
                description: 'autotest description',
                lang: 'Java',
                framework: 'java11',
                buildTool: 'maven',
                testReportFramework: 'allure',
                jobProvisioning: 'default',
                versioningType: 'edp',
                versioningStartFrom: '0.0.0-SNAPSHOT',
            });

            expect(object).toMatchObject({
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'Codebase',
                spec: {
                    type: 'autotests',
                    strategy: 'clone',
                    gitServer: 'gerrit',
                    ciTool: 'jenkins',
                    jenkinsSlave: 'maven-java11',
                    repository: {
                        url: 'https://github.com/kinvolk/headlamp.git',
                    },
                    defaultBranch: 'master',
                    description: 'autotest description',
                    lang: 'Java',
                    framework: 'java11',
                    buildTool: 'maven',
                    testReportFramework: 'allure',
                    jobProvisioning: 'default',
                    versioning: {
                        type: 'edp',
                        startFrom: '0.0.0-SNAPSHOT',
                    },
                },
                metadata: {
                    name: 'test',
                    namespace: 'edp-delivery-vp-delivery-dev',
                },
            });
        });
    });
});
