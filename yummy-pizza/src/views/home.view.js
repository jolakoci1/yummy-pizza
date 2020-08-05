import React from "react";
import { withStyles } from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import clsx from "clsx";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from "@material-ui/core/Typography";
import Button from "../components/button";

const backgroundImage =
    'https://images.unsplash.com/photo-1588014164218-d9ecba01aaff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80';

const styles = (theme) => ({
    root: {
        color: theme.palette.common.white,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            height: '93vh',
            minHeight: 500,
            maxHeight: 1300,
        },
    },
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        zIndex: -1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
    },
    arrowDown: {
        position: 'absolute',
        bottom: theme.spacing(4),
    },
    backgroundImage: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 200,
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
});

function Home(props){
        const { classes } = props;

    return(
        <div className={classes.root}>
            <Container className={classes.container}>
                <div className={classes.backdrop} />
                <div className={clsx(classes.background,classes.backgroundImage)} />
                <Typography color="inherit" align="center" variant="h2" marked="center">
                    Welcome to Yummy Pizza
                </Typography>
                <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                    Your favourite pizza is only one click away!
                </Typography>
                <Button
                    size="large"
                    className={classes.button}
                    onClick={function () {
                        window.location.href='/menu'
                    }}
                >
                    Order Now
                </Button>
                <ArrowDownwardIcon className={classes.arrowDown}/>
            </Container>
        </div>
    );
}
export default withStyles(styles)(Home);
