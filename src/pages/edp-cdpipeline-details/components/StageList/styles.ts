import { makeStyles } from '@material-ui/core';
import { rem } from '../../../../utils/styling/rem';

export const useStyles = makeStyles(() => ({
    labelChip: {
        height: rem(20),
        lineHeight: 1,
        paddingTop: rem(2),
    },
    labelChipBlue: {
        backgroundColor: '#cbe1f9',
        color: '#1261af',
    },
    labelChipGreen: {
        backgroundColor: '#c3e6cd',
        color: '#2f6f45',
    },
    tableRoot: {
        '& .MuiTableCell-root': {
            fontSize: '1rem',

            '&:nth-child(1)': {
                width: rem(100),
            },

            '&:nth-child(2)': {
                width: rem(300),
            },

            '&:last-child': {
                width: rem(50),
            },
        },
    },
}));
