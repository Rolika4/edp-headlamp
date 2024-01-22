const NAMES = {
    USERNAME: 'username',
    PASSWORD: 'password',
    URL: 'url',
    EXTERNAL_URL: 'externalUrl',
} as const;

export const NEXUS_INTEGRATION_SECRET_FORM_NAMES = {
    [NAMES.USERNAME]: {
        name: NAMES.USERNAME,
    },
    [NAMES.PASSWORD]: {
        name: NAMES.PASSWORD,
    },
    [NAMES.URL]: {
        name: NAMES.URL,
    },
    [NAMES.EXTERNAL_URL]: {
        name: NAMES.EXTERNAL_URL,
    },
};
