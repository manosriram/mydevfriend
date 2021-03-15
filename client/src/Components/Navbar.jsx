import { useState } from "react";
import "../Styles/Nav.css";
import {
    TextInput,
    TabNavigation,
    Tab,
    Icon,
    SearchIcon,
    Menu,
    Button,
    SelectMenu,
    Heading,
    Popover,
    Avatar,
    SearchInput,
    Pane,
    Text
} from "evergreen-ui";
import { useEffect } from "react";
import Cookie from "js-cookie";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import io from "socket.io-client";
const socket = io(process.env.REACT_APP_ADDR, {
    path: "/socket",
    transports: ["websocket"],
    upgrade: false
});

const customDefaultStyles = {
    padding: "5px",
    margin: "5px"
};

function Navbar(props) {
    const handleLogout = async () => {
        try {
            Cookie.remove("jtk");
            const headers = {
                authorization: "Bearer " + Cookie.get("jtk")
            };
            const res = axios.post(
                "/api/auth/logout",
                {
                    username: props.user.username
                },
                headers
            );

            socket.emit("offline", { username: props.user.username });

            props.history.push("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={customDefaultStyles}>
            <Pane height="5vh" width="100%" border="none">
                <TabNavigation>
                    <Tab
                        onClick={() => props.history.push("/")}
                        key="messages"
                        is=""
                        id="foundbug"
                    >
                        <h2>mydevfriend</h2>
                    </Tab>

                    {props.user && (
                        <>
                            <Tab
                                onClick={() => props.history.push("/messages")}
                                key="messages"
                                is=""
                                href="/messages"
                                id="/messages"
                            >
                                <h2>messages</h2>
                            </Tab>

                            <Popover
                                content={
                                    <Menu>
                                        <Menu.Group>
                                            <Menu.Item
                                                onClick={() =>
                                                    props.history.push(
                                                        `/user/${props.user.username}`
                                                    )
                                                }
                                            >
                                                Profile
                                            </Menu.Item>
                                            <Menu.Item
                                                onClick={() =>
                                                    props.history.push(
                                                        "/account"
                                                    )
                                                }
                                            >
                                                Account
                                            </Menu.Item>
                                        </Menu.Group>
                                        <Menu.Divider />
                                        <Menu.Group>
                                            <Menu.Item
                                                intent="danger"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </Menu.Item>
                                        </Menu.Group>
                                    </Menu>
                                }
                            >
                                <Avatar
                                    id="avatar"
                                    float="right"
                                    name={props.user.username}
                                    size={40}
                                />
                            </Popover>
                        </>
                    )}
                </TabNavigation>
            </Pane>
        </div>
    );
}

export default withRouter(Navbar);
