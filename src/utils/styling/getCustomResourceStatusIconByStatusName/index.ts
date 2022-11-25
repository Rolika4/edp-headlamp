import { ICONS } from '../../../constants/icons';
import {
    ARGO_APPLICATION_HEALTH_STATUSES,
    ARGO_APPLICATION_SYNC_STATUSES,
    CUSTOM_RESOURCE_ACTIVE_STATUSES,
    CUSTOM_RESOURCE_STATUSES,
    PIPELINE_RUN_STATUSES,
} from '../../../constants/statuses';
import { IconProps, StatusType } from './types';

export enum STATUSES_COLORS {
    SUCCESS = '#327335',
    ERROR = '#ba3329',
    SUSPENDED = '#766f94',
    IN_PROGRESS = '#009dff',
    MISSING = '#f4c030',
}

export const getCustomResourceStatusIconByStatusName = (status: StatusType): IconProps => {
    switch (status) {
        case CUSTOM_RESOURCE_STATUSES['CREATED']:
            return [ICONS['CHECK_CIRCLE'], STATUSES_COLORS['SUCCESS']];

        case CUSTOM_RESOURCE_STATUSES['FAILED']:
            return [ICONS['CROSS_CIRCLE'], STATUSES_COLORS['ERROR']];

        case CUSTOM_RESOURCE_STATUSES['INITIALIZED']:
            return [ICONS['LOADER_CIRCLE'], STATUSES_COLORS['IN_PROGRESS'], true];

        case CUSTOM_RESOURCE_STATUSES['IN_PROGRESS']:
            return [ICONS['LOADER_CIRCLE'], STATUSES_COLORS['IN_PROGRESS'], true];

        case CUSTOM_RESOURCE_STATUSES['UNKNOWN']:
            return [ICONS['UNKNOWN'], 'grey'];

        case CUSTOM_RESOURCE_ACTIVE_STATUSES['ACTIVE']:
            return [ICONS['CHECK_CIRCLE'], STATUSES_COLORS['SUCCESS']];

        case CUSTOM_RESOURCE_ACTIVE_STATUSES['INACTIVE']:
            return [ICONS['CROSS_CIRCLE'], STATUSES_COLORS['ERROR']];

        case PIPELINE_RUN_STATUSES['SUCCEEDED']:
            return [ICONS['CHECK_CIRCLE'], STATUSES_COLORS['SUCCESS']];

        case PIPELINE_RUN_STATUSES['RUNNING']:
            return [ICONS['LOADER_CIRCLE'], STATUSES_COLORS['IN_PROGRESS'], true];

        case PIPELINE_RUN_STATUSES['FAILED']:
            return [ICONS['CROSS_CIRCLE'], STATUSES_COLORS['ERROR']];

        case ARGO_APPLICATION_HEALTH_STATUSES['HEALTHY']:
            return [ICONS['HEART'], STATUSES_COLORS['SUCCESS']];

        case ARGO_APPLICATION_HEALTH_STATUSES['PROGRESSING']:
            return [ICONS['LOADER_CIRCLE'], STATUSES_COLORS['IN_PROGRESS'], true];

        case ARGO_APPLICATION_HEALTH_STATUSES['DEGRADED']:
            return [ICONS['HEART_BROKEN'], STATUSES_COLORS['ERROR']];

        case ARGO_APPLICATION_HEALTH_STATUSES['SUSPENDED']:
            return [ICONS['PAUSE'], STATUSES_COLORS['SUSPENDED']];

        case ARGO_APPLICATION_HEALTH_STATUSES['MISSING']:
            return [ICONS['GHOST'], STATUSES_COLORS['MISSING']];

        case ARGO_APPLICATION_SYNC_STATUSES['SYNCED']:
            return [ICONS['ARROW_CHECK'], STATUSES_COLORS['SUCCESS']];

        case ARGO_APPLICATION_SYNC_STATUSES['OUT_OF_SYNC']:
            return [ICONS['ARROW_CIRCLE_UP'], STATUSES_COLORS['MISSING']];

        default:
            return [ICONS['LOADER_CIRCLE'], STATUSES_COLORS['IN_PROGRESS'], true];
    }
};
