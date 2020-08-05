import React from 'react';
import ImgMediaCard from "../components/pizzaCard";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from '../components/button'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },

];
const sizes = [
    {
        value: 1,
        label: 'Small',
    },
    {
        value: 2,
        label: 'Medium',
    }, {
        value: 3,
        label: 'Large',
    },

];

export default class Menu extends React.Component {

    state = {
        pizzas: '',
        pending: true,
        amount: '',
        currency: 'USD',

        clicks: 1,
        show: true,
        delivery:4.5,
        chartItems: [],
        totalPrice: 0

    };
    l
    IncrementItem = (index) => {
        let chartItems = this.state.chartItems;
        let item = chartItems[index];
        item.quantity += 1;
        chartItems[index] = item;
        this.setState({chartItems: chartItems})
        localStorage.setItem('chart', JSON.stringify(chartItems))

    };
    DecreaseItem = (index) => {
        let chartItems = this.state.chartItems;
        let item = chartItems[index];
        item.quantity -= 1;
        if (item.quantity === 0) {
            chartItems.splice(index, 1)
        } else {
            chartItems[index] = item;
        }
        this.setState({chartItems: chartItems})
        localStorage.setItem('chart', JSON.stringify(chartItems))
    }

    componentDidMount() {
        this.setState({chartItems: JSON.parse(localStorage.getItem('chart'))})

        axios.get(process.env.REACT_APP_API_GATEWAY+'pizza')
            .then((resp) => {
                let response = resp['data'];
                if (response['status'] === 200) {
                    let data = response['data']
                    this.setState({pizzas: data, pending: false})
                }
            })
    }

    handleChange = (input) => e => {
        this.setState({[input]: e.target.value})
    }
    changeSize = (index) => e => {
        let chartItems = this.state.chartItems;
        let item = chartItems[index];
        item.size = e.target.value;
        if (item.size == 1) {
            item.price = item.priceSmall
        }
        if (item.size == 2) {
            item.price = item.priceMedium
        }
        if (item.size == 3) {
            item.price = item.priceLarge
        }
        chartItems[index] = item;
        this.setState({chartItems: chartItems})
        localStorage.setItem('chart', JSON.stringify(chartItems))
    }

    sumPrices() {
        let sum = 0;
        var chartItems = new Array(10);
        chartItems = JSON.parse(localStorage.getItem('chart')) ?? [];
        for(let i=0; i<chartItems.length;i++){
            sum+=(chartItems[i].price*chartItems[i].quantity)
        }
        return sum;
    }

    addItem = item => {
        item = {
            id: item.id,
            name: item.name,
            quantity: 1,
            size: 1,
            priceSmall: item.price_small,
            priceMedium: item.price_medium,
            priceLarge: item.price_large,
            price: item.price_small
        };
        var chartItems = new Array(10);
        chartItems = JSON.parse(localStorage.getItem('chart')) ?? [];
        chartItems.push(item);
        this.setState({chartItems: chartItems})
        localStorage.setItem('chart', JSON.stringify(chartItems))


    }

    handleSubmit() {
        let chartItems =JSON.parse(localStorage.getItem('chart'))
        if( Array.isArray(chartItems) && chartItems.length ){
            window.location.href='/delivery'
        }else{
            window.location.href='/menu'
        }

    }

    render() {
        const currencyLabel = this.state.currency === 'USD' ? "$" : '€';
        const currencyRate = this.state.currency === 'USD' ? 1 : 0.92;
        const chartItems = JSON.parse(localStorage.getItem('chart')) ?? [];

        return (

            <div className="row">
                {
                    this.state.pending ? (

                        <CircularProgress color="secondary" className="col-lg-9"/>

                    ) : (
                        <div className="col-lg-9">

                            <div>
                                {this.state.pizzas.map((pizza, i) => {
                                    return (
                                        <div style={{display: 'inline-block', margin: 50}}>
                                            <ImgMediaCard image={pizza.image} name={pizza.name} key={i}
                                                          description={pizza.description}
                                                          price={pizza.price_small} unique={i}
                                                          addToChart={this.addItem.bind(this, pizza)}/>

                                        </div>
                                    )
                                })

                                }
                            </div>

                        </div>
                    )
                }
                <div style={{
                    border: "1px solid grey",
                    float: "right",
                    height: "100vh",
                    width: 360,
                    boxShadow: "5px 3px 5px #9E9E9E"
                }}>
                    <Container>
                        <Typography style={{marginBottom: "5px", marginTop: 20}} component="h4"
                                    variant="h4" noWrap>
                            Invoice
                        </Typography>
                        <Typography variant="subtitle1" color="inherit" component="h5"
                                    style={{width: "22vw", marginBottom: 15}}>
                            This is the Yummy Pizza electronic bill. Here you can view your order
                        </Typography>
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            value={this.state.currency}
                            onChange={this.handleChange('currency')}
                            Select4={{
                                native: true,
                            }}
                            helperText="Currency"
                            variant="outlined"
                            style={{maxWidth: 50}}
                        >
                            {currencies.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <hr/>
                        <h5>Your Order</h5>
                        {
                            Array.isArray(chartItems) && chartItems.length ?
                                (

                                    <div style={{height: '48vh', overflowY: 'auto'}}>
                                        {
                                            chartItems.map((item, i) => {
                                                console.log(item);
                                                return (
                                                    <div>
                                                        <hr />
                                                        <div className="row mx-auto justify-content-center">
                                                            <Button size="small" style={{height: 40}}
                                                                    onClick={this.DecreaseItem.bind(this, i)}><RemoveIcon/></Button>
                                                            {this.state.show ?
                                                                <h6>{item.quantity}x {item.name}</h6> : ''}
                                                            <Button size='small' style={{height: 40}}
                                                                    onClick={this.IncrementItem.bind(this, i)}><AddIcon/></Button>
                                                            <div className="row ">
                                                                <TextField
                                                                    id="outlined-select-currency-native"
                                                                    select
                                                                    value={item.size}
                                                                    onChange={this.changeSize(i)}
                                                                    SelectProps={{
                                                                        native: true,
                                                                    }}
                                                                    variant="outlined"
                                                                    style={{maxWidth: 100}}

                                                                >
                                                                    {sizes.map((option) => (
                                                                        <option key={option.value}
                                                                                value={option.value}>
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </TextField>
                                                                <Typography variant="h6" classsName="my-1">{item.price * currencyRate}{currencyLabel}</Typography>
                                                            </div>
                                                        </div>


                                                        <hr />
                                                    </div>
                                                )
                                            })

                                        }

                                        <div className="mx-2">
                                            <Typography variant="h6">Delivery Cost : {this.state.delivery * currencyRate}{currencyLabel}</Typography>
                                        </div>
                                        <hr/>
                                    </div>


                                ) : (
                                    <div>No items yet</div>
                                )
                        }

                        <h2>Price: {
                            Array.isArray(chartItems) && chartItems.length ? (
                                 ((this.sumPrices()+this.state.delivery) * currencyRate).toFixed(2)
                            ):(0.00)} {currencyLabel}
                            </h2>
                        <Button size="large" style={{
                            borderRadius: 50, marginLeft: 10,
                        }} onClick={this.handleSubmit.bind(this)}>Check Out</Button>

                    </Container>
                </div>
            </div>
        );
    }

}
