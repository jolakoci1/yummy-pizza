import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default withStyles((theme) => ({
    root: {
        borderRadius: 0,
        padding: theme.spacing(2, 4),
        boxShadow: 'none',
        '&:active, &:focus': {
            boxShadow: 'none',

        },
        '&:hover':{
            backgroundColor: theme.palette.error.dark,

        },
        backgroundColor: theme.palette.error.main,
        color:'white'

    },
    sizeSmall: {
        padding: theme.spacing(1, 2),
        fontSize: theme.spacing(8),

    },
    sizeLarge: {
        padding: theme.spacing(2, 5),
        fontSize: theme.typography.pxToRem(16),
    },
}))(Button);
