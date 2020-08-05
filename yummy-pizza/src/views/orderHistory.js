import React from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme=>({
    root: {
        width: '80vw',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 130,
        marginTop: 30,
        marginRight: 'auto',
    },
    container: {
        maxHeight: 440,
    },
});
const columns = [
    {id: 'nr', label: 'Nr', maxWidth: 130},
    {id: 'pizza_name', label: 'Name', maxWidth: 230},

    {id: 'quantity', label: 'Quantity', maxWidth: 230},
    {
        id: 'size',
        label: 'Size',
        maxWidth: 230,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'created_at',
        label: 'Date',
        maxWidth: 230,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'price',
        label: 'Price',
        maxWidth: 230,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

class OrderHistory extends React.Component {

    state = {
        userData: [],
        page: 0,
        rowsPerPage: 10,
    }
    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: +event.target.value, page: 0});
    };

    componentDidMount() {
       let user =JSON.parse(localStorage.getItem('user')) ;
        let token = localStorage.getItem('token')
        console.log(user);
        axios.get(`${process.env.REACT_APP_API_GATEWAY}orders/${user.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(resp => {
            console.log(resp)
            let successData = JSON.parse(JSON.stringify(resp['data']));
            if (successData['status'] === 200) {
               let orderData = successData['data'].map((item,i)=>{
                   let sizeString ="Small"
                   if(item.size==2){
                       sizeString="Medium"
                   }
                   if(item.size==3){
                       sizeString="Large"
                   }
                    return {
                        "nr": i+1,
                        "pizza_name":item.pizza_name,
                        "quantity":item.quantity,
                        "size":sizeString,
                        "created_at":item.created_at,
                        "price":item.price
                    }
                });

                this.setState({userData: orderData})
            }
        }).catch(err => {
            console.log(err);
            window.location.href = '/not-found'
        })
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <Paper className={classes.root}>
                    <Typography gutterBottom variant="h4" component="h2">Your Order History</Typography>

                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.userData.slice(this.state.page * this.state.rowsPerPage,
                                    this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={this.state.userData.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                );
                }
            </div>
        )
    }
}

export default withStyles(useStyles)(OrderHistory)
