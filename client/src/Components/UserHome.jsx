import React, { useState, useEffect } from "react";
import {
    toaster,
    LogInIcon,
    Button,
    TextInput,
    Heading,
    Pane,
    Text
} from "evergreen-ui";
import { withRouter } from "react-router-dom";
import { Navbar } from "./";

function UserHome(props) {
    const [user, setUser] = useState({});
    useEffect(() => {
        if (!props.location.state) {
            props.history.push("/");
        }
        const {
            username,
            email,
            firstName,
            lastName,
            location,
            dob
        } = props.location.state.user;
        setUser({
            username,
            email,
            firstName,
            lastName,
            location,
            dob
        });
    }, []);

    return (
        <>
            <Navbar user={user} />
            {user.email}
        </>
    );
}
export default withRouter(UserHome);
