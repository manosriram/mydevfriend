import React from "react";
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
    return (
        <>
            <Navbar />
            {props.location.state.user.username}
        </>
    );
}
export default withRouter(UserHome);
