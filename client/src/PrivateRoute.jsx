import { Route, Redirect } from "react-router-dom";
import getUser from "./getUser";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                Cookie.get("jtk") !== undefined ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/" }} />
                )
            }
        />
    );
};
