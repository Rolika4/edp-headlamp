import { GENERATE_URL_SERVICE } from './index';

describe('testing GENERATE_URL_SERVICE', () => {
    describe('test createArgoCDApplicationLink util', () => {
        it('should successfully create argocd application url based on given argoCDURLOrigin, pipeline name, stage name and app name params', () => {
            expect(
                GENERATE_URL_SERVICE.createArgoCDApplicationLink(
                    'https://argocd-test.com/',
                    'test-pipeline-name',
                    'test-stage-name',
                    'test-app-name'
                )
            ).toEqual(
                'https://argocd-test.com/applications?labels=app.edp.epam.com%2Fpipeline%3Dtest-pipeline-name%2Capp.edp.epam.com%2Fstage%3Dtest-stage-name%2Capp.edp.epam.com%2Fapp-name%3Dtest-app-name'
            );
        });
    });

    describe('test createArgoCDPipelineLink util', () => {
        it('should successfully create argocd pipeline url based on given argoCDURLOrigin and pipeline name param', () => {
            expect(
                GENERATE_URL_SERVICE.createArgoCDPipelineLink(
                    'https://argocd-test.com/',
                    'test-pipeline-name'
                )
            ).toEqual(
                'https://argocd-test.com/applications?labels=app.edp.epam.com%2Fpipeline%3Dtest-pipeline-name'
            );
        });
    });

    describe('test createArgoCDStageLink util', () => {
        it('should successfully create argocd stage url based on given argoCDURLOrigin, pipeline name and stage name params', () => {
            expect(
                GENERATE_URL_SERVICE.createArgoCDStageLink(
                    'https://argocd-test.com/',
                    'test-pipeline-name',
                    'test-stage-name'
                )
            ).toEqual(
                'https://argocd-test.com/applications?labels=app.edp.epam.com%2Fpipeline%3Dtest-pipeline-name%2Capp.edp.epam.com%2Fstage%3Dtest-stage-name'
            );
        });
    });

    describe('test createGrafanaLink util', () => {
        it('should successfully create grafana url based on given grafanaURLOrigin and namespace params', () => {
            expect(
                GENERATE_URL_SERVICE.createGrafanaLink('https://grafana-test.com', 'test-namespace')
            ).toEqual(
                'https://grafana-test.com/d/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=test-namespace'
            );
        });
    });

    describe('test createJaegerLink util', () => {
        it('should successfully create jaeger url based on given createJaegerLink and argo application name params', () => {
            expect(
                GENERATE_URL_SERVICE.createJaegerLink('https://jaeger-test.com', 'test-app-name')
            ).toEqual(
                'https://jaeger-test.com/search?limit=20&lookback=1h&maxDuration&minDuration&service=test-app-name'
            );
        });
    });

    describe('test createKibanaLink util', () => {
        it('should successfully create kibana url based on given kibanaURLOrigin and namespace params', () => {
            expect(
                GENERATE_URL_SERVICE.createKibanaLink('https://kibana-test.com', 'test-namespace')
            ).toEqual(
                "https://kibana-test.com/app/discover#/?_g=()&_a=(columns:!(message),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:kubernetes_namespace_name,negate:!f,params:(query:test-namespace),type:phrase),query:(match_phrase:(kubernetes_namespace_name:test-namespace)))),interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))"
            );
        });
    });

    describe('test createGrafanaLink util', () => {
        it('should successfully create grafana url based on given grafanaURLOrigin and namespace params', () => {
            expect(
                GENERATE_URL_SERVICE.createSonarLink(
                    'https://sonar-test.com',
                    'test-codebaseBranch-name'
                )
            ).toEqual('https://sonar-test.com/dashboard?id=test-codebaseBranch-name');
        });
    });

    describe('test createTektonPipelineLink util', () => {
        it('should successfully create tekton pipeline url based on given tektonURLOrigin, namespace and pipeline name params', () => {
            expect(
                GENERATE_URL_SERVICE.createTektonPipelineLink(
                    'https://tekton-test.com',
                    'test-namespace',
                    'test-pipeline-name'
                )
            ).toEqual(
                'https://tekton-test.com/#/namespaces/test-namespace/pipelines/test-pipeline-name'
            );
        });
    });

    describe('test createTektonPipelineRunLink util', () => {
        it('should successfully create tekton pipeline run url based on given tektonURLOrigin, namespace and pipeline run name params', () => {
            expect(
                GENERATE_URL_SERVICE.createTektonPipelineRunLink(
                    'https://tekton-test.com',
                    'test-namespace',
                    'test-pipeline-run-name'
                )
            ).toEqual(
                'https://tekton-test.com/#/namespaces/test-namespace/pipelineruns/test-pipeline-run-name'
            );
        });
    });

    describe('test createJenkinsPipelineLink util', () => {
        it('should successfully create jenkins pipeline url based on given jenkinsURLOrigin and pipeline name params', () => {
            expect(
                GENERATE_URL_SERVICE.createJenkinsPipelineLink(
                    'https://jenkins-test.com',
                    'test-pipeline-name'
                )
            ).toEqual('https://jenkins-test.com/job/test-pipeline-name-cd-pipeline');
        });
    });

    describe('test createJenkinsPipelineStageLink util', () => {
        it('should successfully create jenkins pipeline stage url based on given jenkinsURLOrigin, pipeline name and stage name params', () => {
            expect(
                GENERATE_URL_SERVICE.createJenkinsPipelineStageLink(
                    'https://jenkins-test.com',
                    'test-pipeline-name',
                    'test-stage-name'
                )
            ).toEqual(
                'https://jenkins-test.com/job/test-pipeline-name-cd-pipeline/job/test-stage-name'
            );
        });
    });
});
