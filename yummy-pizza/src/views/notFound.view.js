import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const BackgroundBody = styled.div({
    position: 'absolute',
    height: "93.5vh",
    width: "100vw",
    background: 'url(https://images.unsplash.com/photo-1561350111-7daa4f284bc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
});


const useStyles = makeStyles((theme) => ({
    text:{
        opacity:0.9,
        fontSize:theme.spacing(16),
        fontWeight:"bold",
        color:'white'
    },
    text2:{
        opacity:0.9,
        marginTop:theme.spacing(1),
        color:'white'

    }
}));
export default function NotFound() {
    const classes = useStyles();

    return (
        <div>
            <BackgroundBody>
                <Typography variant="h1" className={classes.text}>
                    404
                </Typography>
                <Typography variant="h5" className={classes.text2}>
                    Page not found!
                </Typography>
                <Typography variant="h5" className={classes.text2}>
                    Looks like you got lost.. :(
                </Typography>
            </BackgroundBody>
        </div>
    )
}
