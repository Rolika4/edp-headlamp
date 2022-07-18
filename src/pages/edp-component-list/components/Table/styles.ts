import { rem } from '../../../../utils/styling/rem';

const {
    pluginLib: { MuiCore },
} = globalThis;
const { makeStyles } = MuiCore;

export const useStyles = makeStyles(() => ({
    serviceItemIcon: {
        display: 'block',
        width: rem(50),
        height: rem(50),

        '& img': {
            width: '100%',
            height: '100%',
        },
    },
}));