import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import LogOut from "../authentication/logout";
import {makeStyles} from '@material-ui/core/styles';

const style = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
    },
    whiteText: {
        color: 'white',
        marginRight: 10
    },
    signupText: {
        color: theme.palette.error.light
    },
    yummy: {
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'white',
        letterSpacing: 2
    }
}));

export default function NavBarComponent() {
    const classes = style();

    const chart = JSON.parse(localStorage.getItem('chart'));
    const chartItems = !!chart ? chart.length : 0;
    return (
        <div>
            <Navbar expand="lg" sticky="top" className={classes.root}>
                <Navbar.Brand href="/home"><h4 className={classes.yummy}>Yummy Pizza</h4></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

                    {
                        !!localStorage.getItem('user') ? (
                            <Nav className="h5 text-white">
                                <Nav.Link href="/home"><h5 className={classes.whiteText}>Home</h5></Nav.Link>
                                <Nav.Link href="/history" className={classes.whiteText}><h5
                                    className={classes.whiteText}>Order History</h5></Nav.Link>
                                <Nav.Link onClick={LogOut} className={classes.whiteText}><h5
                                    className={classes.whiteText}>Log out</h5></Nav.Link>
                                <Nav.Link>
                                    <IconButton color="inherit">
                                        <Badge badgeContent={chartItems} color="secondary">
                                            <ShoppingCartIcon style={{backgroundColor:'white'}}/>
                                        </Badge>
                                    </IconButton>
                                </Nav.Link>
                            </Nav>
                        ) : (
                            <Nav className="h5">
                                <Nav.Link href="/home"><h5 className={classes.whiteText}>HOME</h5></Nav.Link>
                                <Nav.Link href="/signin"><h5 className={classes.whiteText}>SIGN IN</h5></Nav.Link>
                                <Nav.Link href="/signup"><h5 className={classes.signupText}>SIGN UP</h5></Nav.Link>
                                <Nav.Link>
                                    <IconButton color="inherit">
                                        <Badge badgeContent={chartItems} color="secondary">
                                            <ShoppingCartIcon  style={{color:'white'}}/>
                                        </Badge>
                                    </IconButton>
                                </Nav.Link>
                            </Nav>
                        )
                    }
                </Navbar.Collapse>
            </Navbar>

        </div>
    );
}
