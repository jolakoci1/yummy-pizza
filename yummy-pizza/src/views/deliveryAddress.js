import React from 'react';
import Button from '../components/button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import clsx from "clsx";
import axios from "axios";
import SimpleAlert from "../components/alert";

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

export default function DeliveryAddress() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        phoneNumber: '',
        address: '',
        alertOpen: false,
        alertMessage: ''
    });

    const handleChange = (input) => e => {
        setState({...state, [input]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if (!!user) {
            let chartItems = JSON.parse(localStorage.getItem('chart'));
            let data = chartItems.map((item, i) => {
                    return (
                        {
                            "pizza_id": item.id,
                            "user_id": user.id,
                            "size": item.size,
                            "quantity": item.quantity,
                            "price": item.price,
                            "address": state.address,
                            "phone_number": state.phoneNumber
                        }
                    )
                }
            )
            console.log(data);
            let token = localStorage.getItem('token');
            axios.post(process.env.REACT_APP_API_GATEWAY+'order', {
                "orders": data
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'applicaiton/json'
                }
            }).then((resp) => {
                console.log(resp)
                let response = resp['data'];
                if (response['status'] === 200) {
                    alert('Order Completed successfully');
                    localStorage.removeItem('chart')
                    window.location.href = '/history'
                }
            }).catch(err => {
                setState({
                    ...state, alertOpen: true,
                    alertMessage: err
                })
            })
        }
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
                        <Typography component="h1" variant="h5">
                            Delivery address
                        </Typography>
                        <form className={classes.form}>

                            <Typography variant="h6" className={classes.center} color="textSecondary">
                                Where do you want pizza to be delivered
                            </Typography>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    rows={2}
                                    className={classes.textField}
                                    rowsMax={3}
                                    name="address"
                                    label="Address"
                                    type="text"
                                    id="adress"
                                    onChange={handleChange('address')}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    className={classes.textField}
                                    fullWidth
                                    id="number"
                                    label="Phone Number"
                                    name="number"
                                    type="tel"
                                    onChange={handleChange('phoneNumber')}

                                />
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
                    </div>
                </Container>
            </div>
            <SimpleAlert open={state.alertOpen} handleClose={handleAlertClose} severity="warning"
                         message={state.alertMessage}/>
        </div>
    );
}
