import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

function SlideTransition(props) {
    return <Slide {...props} direction="left"/>;
}

export default function SimpleAlert(props) {
    const [state] = React.useState({
        Transition: SlideTransition,
        vertical: 'top',
        horizontal: 'center',
    });
    const {vertical, horizontal} = state;
    const classes = useStyles();

    return (
        <div>
            <Snackbar
                autoHideDuration={6000}
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={state.Transition}
                anchorOrigin={{vertical, horizontal}}
                key={`${vertical},${horizontal}`}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={props.handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>}
            >
                <Alert onClose={props.handleClose} severity={props.severity}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
