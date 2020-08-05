import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavBarComponent from "./components/navBar.component";
import Home from "./views/home.view";
import Menu from "./views/menu.view";
import SignIn from "./views/signIn.view";
import SignUp from "./views/signUp.view";
import NotFound from "./views/notFound.view";
import PrivateRoute from "./authentication/privateRoute";
import OrderHistory from "./views/orderHistory";
import DeliveryAddress from "./views/deliveryAddress";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <NavBarComponent className="fixed-top"/>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/menu" component={Menu}/>
                <Route path="/not-found" component={NotFound}/>

                <Route path="/signin" component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
                <PrivateRoute path="/history" component={OrderHistory}/>
                <PrivateRoute path="/delivery" component={DeliveryAddress}/>

              </Switch>
            </div>
          </div>

        </div>
      </Router>
    </div>
  );
}

export default App;
