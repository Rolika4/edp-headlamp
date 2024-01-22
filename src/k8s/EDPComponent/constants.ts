export const SYSTEM_EDP_COMPONENTS = {
    // must be equal to EDPComponent.spec.type values

    GERRIT: 'gerrit',
    GITLAB: 'gitlab',
    GITHUB: 'github',
    TEKTON: 'tekton',
    ARGOCD: 'argocd',
    DEFECT_DOJO: 'defectdojo',
    DEPENDENCY_TRACK: 'dependency-track',
    DOCKER_REGISTRY: 'docker-registry',
    GRAFANA: 'grafana',
    KIBANA: 'kibana',
    NEXUS: 'nexus',
    SONAR: 'sonar',
} as const;

export const SYSTEM_EDP_COMPONENTS_WITH_CONFIGURATION = [
    SYSTEM_EDP_COMPONENTS.NEXUS,
    SYSTEM_EDP_COMPONENTS.ARGOCD,
    SYSTEM_EDP_COMPONENTS.SONAR,
    SYSTEM_EDP_COMPONENTS.DEFECT_DOJO,
    SYSTEM_EDP_COMPONENTS.DEPENDENCY_TRACK,
] as const;

export const SYSTEM_EDP_COMPONENTS_LABELS = {
    [SYSTEM_EDP_COMPONENTS.GERRIT]: 'Gerrit',
    [SYSTEM_EDP_COMPONENTS.GITLAB]: 'GitLab',
    [SYSTEM_EDP_COMPONENTS.GITHUB]: 'GitHub',
    [SYSTEM_EDP_COMPONENTS.TEKTON]: 'Tekton',
    [SYSTEM_EDP_COMPONENTS.ARGOCD]: 'Argo CD',
    [SYSTEM_EDP_COMPONENTS.DEFECT_DOJO]: 'DefectDojo',
    [SYSTEM_EDP_COMPONENTS.DEPENDENCY_TRACK]: 'DependencyTrack',
    [SYSTEM_EDP_COMPONENTS.DOCKER_REGISTRY]: 'DockerRegistry',
    [SYSTEM_EDP_COMPONENTS.GRAFANA]: 'Grafana',
    [SYSTEM_EDP_COMPONENTS.KIBANA]: 'Kibana',
    [SYSTEM_EDP_COMPONENTS.NEXUS]: 'Nexus',
    [SYSTEM_EDP_COMPONENTS.SONAR]: 'Sonar',
} as const;
