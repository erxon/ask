import React, {Component} from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "./auth-helper";

const PrivateRoute = ({ element: Component, ...rest }) => {
    return (<Route {...rest} render={props => (
        auth.isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Navigate to={{
                pathname: "/",
                state: { from: props.location }
            }}/>
        )
    )} />);
}

export default PrivateRoute;
