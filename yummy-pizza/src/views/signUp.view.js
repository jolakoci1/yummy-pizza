import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '../components/button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import clsx from "clsx";
import SimpleAlert from "../components/alert";
import {validate} from "indicative/validator";
import axios from "axios";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    background: {
        width: "100vw",
        position: 'absolute',
        backgroundImage: "url('https://images.unsplash.com/photo-1542834369-f10ebf06d3e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')",
        height: "93.5vh",
        backgroundSize: "cover"
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
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "auto",
        marginRight: "auto"
    },
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textField: {
        backgroundColor: "rgba(214, 196, 195, 0.9)",
        boxShadow: "5px 5px 5px grey",
    },
}));

export default function SignUp() {
    const classes = useStyles();

    //validation messages to be returned to the user
    const messages = {
        'required': `This field is required!`,
        'email.email': 'The email is invalid!',
        'password.min': 'The password should have at least 8 characters!'
    };

    //validation rules for fields
    const rules = {
        firstName: 'required',
        lastName: 'required|string',
        email: 'required|email',
        password: 'required|string|min:8',
    };
    const [state, setState] = React.useState({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
        alertOpen: false,
        alertMessage: '',
        errors: {}
    });

    const handleChange = (input) => e => {
        setState({...state, [input]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const input = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            address: state.address,
            phoneNumber: state.phoneNumber
        };
        validate(input, rules, messages)
            .then((input) => {//if the validations are okay, is sent the request to backend
                    axios.post(process.env.REACT_APP_API_GATEWAY+`register`, {
                            "name": input.firstName + " " + input.lastName,
                            "email": input.email,
                            "password": input.password,
                            "address": input.address,
                            "phone_number": input.phoneNumber
                        }, {
                            headers: {'Content-Type': 'application/json'}
                        }
                    ).then((resp) => {
                            console.log('registered successfully');
                        let successData = JSON.parse(JSON.stringify(resp['data']));

                        console.log(successData)
                        let appState = {
                            user: successData.user,
                            token1: successData.success.token
                        };
                        localStorage.setItem('user', JSON.stringify(appState.user));
                        localStorage.setItem('token', appState.token1);
                        window.location.href='/menu'
                        }
                    ).catch((error) => {
                        //the alert is shown to the user if the login returns error
                        console.log(error)
                        setState({
                            ...state,
                            alertOpen: true,
                            alertMessage: "The email or username is not correct!",
                            errors: {}
                        });
                    })
                }
            ).catch(errors => {
            //the error is shown to the user if validation is not okay
            const formattedErrors = {};
            formattedErrors[errors[0].field] = errors[0].message;//here it is shown one error at a time
            setState({...state, errors: formattedErrors});
        });
    }
    const handleAlertClose = () => {
        setState({...state, alertMessage: '', alertOpen: false});
    };
    return (
        <div className={classes.background}>
            <div>
                <Container component="main" maxWidth="sm">
                    <CssBaseline/>
                    <div className={clsx(classes.paper, classes.container)}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        className={classes.textField}
                                        id="firstName"
                                        label="First Name"
                                        onChange={handleChange('firstName')}
                                    />
                                    {state.errors.firstName && (
                                        <Typography color="error"
                                                    variant="subtitle1">{state.errors.firstName}</Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        className={classes.textField}
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lastName"
                                        onChange={handleChange('lastName')}

                                    />
                                    {state.errors.lastName && (
                                        <Typography color="error"
                                                    variant="subtitle1">{state.errors.lastName}</Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        className={classes.textField}
                                        fullWidth
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
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
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
                                </Grid>


                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        className={classes.textField}
                                        rowsMax={3}
                                        name="address"
                                        label="Address(Optional)"
                                        type="text"
                                        id="adress"
                                        onChange={handleChange('address')}

                                    />
                                    {state.errors.address && (
                                        <Typography color="error"
                                                    variant="subtitle1">{state.errors.address}</Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        className={classes.textField}
                                        fullWidth
                                        id="number"
                                        label="Phone Number(Optional)"
                                        name="number"
                                        type="tel"
                                        onChange={handleChange('phoneNumber')}

                                    />
                                    {state.errors.phone && (
                                        <Typography color="error"
                                                    variant="subtitle1">{state.errors.phone}</Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                Finish Order
                            </Button>
                        </form>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/signin" variant="body1">
                                    Already have an account? SIGN IN!
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <SimpleAlert open={state.alertOpen} handleClose={handleAlertClose} severity="warning"
                         message={state.alertMessage}/>
        </div>
    );
}
