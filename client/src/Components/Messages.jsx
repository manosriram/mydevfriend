import { withRouter } from "react-router-dom";
import { Navbar } from "./";
import { useState, useEffect } from "react";
import getUser from "../getUser";
import {
    toaster,
    LogInIcon,
    Button,
    TextInput,
    Heading,
    Pane,
    Text
} from "evergreen-ui";
import "../Styles/App.css";
import { Form, Formik } from "formik";
import { NavLink } from "react-router-dom";

const fakeUsers = [
    { name: "mano" },
    { name: "abc" },
    { name: "mabc" },
    { name: "manabc" }
];

function Messages(props) {
    const [user, setUser] = useState({});
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getUser().then(res => setUser(res));
    }, []);

    const selectUser = user => {
        setSelectedUser(user);
    };

    return (
        <>
            <Navbar user={user} />
            <div id="container">
                <Pane clearfix>
                    <Pane
                        elevation={4}
                        float="left"
                        backgroundColor="white"
                        width="20vw"
                        height="90vh"
                        margin={24}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <div id="users">
                            {fakeUsers.map(fuser => {
                                return (
                                    <div id="user">
                                        <Pane
                                            background="tint2"
                                            elevation={2}
                                            min-width="18vw"
                                            width="18vw"
                                            height="6vh"
                                            margin="10px"
                                            padding="8px"
                                            onClick={() =>
                                                setSelectedUser(fuser)
                                            }
                                        >
                                            <Text size={600}>{fuser.name}</Text>
                                            <br />
                                        </Pane>
                                    </div>
                                );
                            })}
                        </div>
                    </Pane>
                    <Pane
                        elevation={4}
                        float="left"
                        width="60vw"
                        height="90vh"
                        margin={24}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <h1>{selectedUser.name}</h1>
                    </Pane>
                </Pane>
            </div>
        </>
    );
}

export default withRouter(Messages);
