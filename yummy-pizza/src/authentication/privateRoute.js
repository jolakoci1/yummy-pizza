import React from "react";
import {Redirect, Route} from "react-router-dom";


export default function PrivateRoute({component: RouteComponent, ...rest}) {

    return (
        <Route
            {...rest}
            render={routeProps =>
               !!localStorage.getItem('user') ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={{pathname: '/signin'}}/>
                )
            }
        />
    );
};
