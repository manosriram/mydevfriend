import React, { useContext, useState, useEffect } from "react";
import {
    toaster,
    LogInIcon,
    Button,
    TextInput,
    Heading,
    Pane,
    Text
} from "evergreen-ui";
import { Link, withRouter } from "react-router-dom";
import { UserContext, Navbar } from "./";
import getUser from "../getUser";

function UserHome(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser().then(res => setUser(res));
    }, []);

    return (
        <>
            <Navbar user={user} />
            <Pane
                elevation={0}
                float="left"
                backgroundColor="white"
                width="100%"
                height="auto"
                margin={24}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                {JSON.stringify(user)}
                <Link to="/match">find random user</Link>
            </Pane>
        </>
    );
}
export default withRouter(UserHome);
