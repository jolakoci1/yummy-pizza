import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '../components/button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import clsx from "clsx";
import {validate} from 'indicative/validator';
import axios from "axios";
import SimpleAlert from "../components/alert";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    background: {
        width: "100vw",
        position: 'absolute',
        backgroundImage: "url('https://images.unsplash.com/photo-1542834369-f10ebf06d3e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')",
        height: "93.5vh",
        backgroundSize: "cover",
    },
    container: {
        marginTop: theme.spacing(9),
        padding: theme.spacing(6),
        backgroundColor: "rgba(214, 196, 195, 0.7)",
        boxShadow: "5px 5px 5px black",
        color: "white",
        borderRadius: '10px',
        background: ' white',
        paddingBottom: theme.spacing(2),

    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.error.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 3),
    },
    textField: {
        backgroundColor: "rgba(214, 196, 195, 0.9)",
        boxShadow: "5px 5px 5px grey",
    },
}));

export default function SignIn() {
    const classes = useStyles();
    //validation messages to be returned to the user
    const messages = {
        required: (field) => `The ${field} field is required!`,
        'email.email': 'The email is invalid!',
        'password.min': 'The password should have at least 8 characters!'
    };

    //validation rules for email and password
    const rules = {
        email: 'required|email',
        password: 'required|string|min:8',
    };
    const [state, setState] = React.useState({
        email: '',
        password: '',
        alertOpen: false,
        alertMessage: '',
        errors: {},
        redirect: false,
    });

    const handleChange = (input) => e => {
        setState({...state, [input]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = {
            email: state.email,
            password: state.password
        };

        validate(input, rules, messages)
            .then((input) => {//if the validations are okay, is sent the request to backend
                    axios.post(process.env.REACT_APP_API_GATEWAY+`login`, {
                            "email": input.email,
                            "password": input.password
                        }, {
                            headers: {'Content-Type': 'application/json'}
                        }
                    ).then((resp) => {
                            //logged in successfully
                        let successData = JSON.parse(JSON.stringify(resp['data']));
                        console.log(successData.user)
                            let appState = {
                                user: successData.user,
                                token1: successData.success.token
                            };
                            localStorage.setItem('user', JSON.stringify(appState.user));
                            localStorage.setItem('token', appState.token1);
                            setState({...state, redirect: true});
                        }
                    ).catch((err) => {//the alert is shown to the user if the login returns error
                        console.log(err)
                        setState({
                            ...state,
                            alertOpen: true,
                            alertMessage: "The email or username is not correct!",
                            errors: {}
                        });
                    })
                }
            ).catch(errors => { //the error is shown to the user if validation is not okay
            const formattedErrors = {};
            formattedErrors[errors[0].field] = errors[0].message;//here it is shown one error at a time
            setState({...state, errors: formattedErrors});
        });
    }
    const handleAlertClose = () => {
        setState({...state, alertMessage: '', alertOpen: false});
    };
    return (
        <div>
            {
                state.redirect ?
                    (<Redirect to={{pathname: "/menu"}}/>) :
                    (
                        <div>
                            <div className={classes.background}>
                                <Container component="main" maxWidth="sm">
                                    <CssBaseline/>
                                    <div className={clsx(classes.paper, classes.container)}>
                                        <Avatar className={classes.avatar}>
                                            <LockOutlinedIcon/>
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                            Sign in
                                        </Typography>
                                        <form className={classes.form}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                className={classes.textField}
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                onChange={handleChange('email')}
                                            />
                                            {state.errors.email && (
                                                <Typography color="error"
                                                            variant="subtitle1">{state.errors.email}</Typography>
                                            )}
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                className={classes.textField}
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                                onChange={handleChange('password')}
                                            />
                                            {state.errors.password && (
                                                <Typography color="error"
                                                            variant="subtitle1">{state.errors.password}</Typography>
                                            )}

                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                size="large"
                                                className={classes.submit}
                                                onClick={handleSubmit}
                                            >
                                                Sign In
                                            </Button>
                                            <Grid container>
                                                <Grid item xs>
                                                    <Link href="/signup" variant="body1">
                                                       Don't have an account? SIGN UP!
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </div>

                                </Container>
                            </div>
                            <SimpleAlert open={state.alertOpen} handleClose={handleAlertClose} severity="warning"
                                         message={state.alertMessage}/>
                        </div>

                    )
            }
        </div>
    );
}
