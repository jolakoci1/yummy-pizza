import React, {useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import piceMeSallam from '../assets/images/pice-me-sallam.jpg';
import Button from "./button";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
        boxShadow: '2px 2px 10px grey',
        '&:hover': {}
    },
    background: {
        background: `url(${piceMeSallam})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(1)
    },
    yummy: {
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 'bold',
        letterSpacing: 1
    },
    price: {
        color: theme.palette.error.dark,
    }

}));


export default function ImgMediaCard(props) {
    const classes = useStyles();


    return (
        <div className="row">
            <Card className={clsx(classes.root)}>

                <CardActionArea>

                    <img alt="Pice" src={props.image} style={{width: "100%", height: "100%"}}/>

                    <Typography gutterBottom variant="h4" component="h4"
                                className={classes.yummy}>{props.name}</Typography>
                    <Typography gutterBottom variant="subtitle1" component="h2" style={{width: '70%'}}
                                className={classes.center}>{props.description}</Typography>
                </CardActionArea>
                <Typography gutterBottom variant="h5" component="h2"
                            className={classes.price}>${props.price}</Typography>

                <CardActions className={classes.center}>
                    <Button size="large" style={{borderRadius: 50, marginLeft: 10}}
                            onClick={props.addToChart}><ShoppingCartIcon/>Add to chart</Button>
                </CardActions>

            </Card>
        </div>
    );
}
