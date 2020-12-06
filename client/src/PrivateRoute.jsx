import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                user !== null ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/" }} />
                )
            }
        />
    );
};
