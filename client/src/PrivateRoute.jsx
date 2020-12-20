import { Route, Redirect } from "react-router-dom";
import getUser from "./getUser";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { Navbar } from "./Components";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser().then(res => {
            setUser(res);
        });
    }, []);

    return (
        <Route
            {...rest}
            render={props =>
                Cookie.get("jtk") !== undefined ? (
                    <>
                        <Navbar user={user} />
                        <Component {...props} user={user} />
                    </>
                ) : (
                    <Redirect to={{ pathname: "/" }} />
                )
            }
        />
    );
};
