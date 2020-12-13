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
    DirectionRightIcon,
    Pane,
    Text
} from "evergreen-ui";
import "../Styles/Messages.css";
import { Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import { ChatFeed, Message } from "react-chat-ui";
import axios from "axios";
import io from "socket.io-client";
const socket = io("http://localhost:5454", {
    transports: ["websocket", "polling", "flashsocket"]
});

const fakeUsers = [
    { name: "mano" },
    { name: "abc" },
    { name: "mabc" },
    { name: "sriram" }
];

function Messages(props) {
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [messages, setMessages] = useState([{}]);

    const update = () => {
        // setTimeout(() => {
        // setFakeMessages(messages.concat("new concat"));
        // }, 1500);
    };

    const getMessages = async toUser => {
        const data = {
            from: user.username,
            to: toUser
        };
        const res = axios.post("/chat/history", { data });
        res.then(result => {
            setMessages(result.data.messages[0]);
            sc();
        }).catch(err => {
            console.log(err);
        });
    };

    window.onload = function() {};

    function sc() {
        var objDiv = document.getElementById("msgs");
        if (objDiv) objDiv.scrollTop = objDiv.scrollHeight;
    }

    useEffect(() => {
        getUser().then(res => {
            setUser(res);
        });
    }, []);

    const selectUser = user => {
        setSelectedUser(user);
        getMessages(user);
    };

    const addMessage = message => {
        const el = document.querySelector("#msgs");
        el.insertAdjacentHTML(
            "beforeend",
            `<Text>${message}</Text><br /><br />`
        );
    };

    const sendMessage = message => {
        if (!message) return;
        const from = user.username,
            to = selectedUser;

        socket.emit("message", { from, to, message: message.message });
        addMessage(message.message);
    };

    var last;
    return (
        <>
            <Navbar user={user} />
            <div id="container">
                <Pane id="con" clearfix>
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
                                        >
                                            <Text
                                                size={600}
                                                onClick={() => {
                                                    selectUser(fuser.name);
                                                }}
                                            >
                                                {fuser.name}
                                            </Text>
                                            <br />
                                        </Pane>
                                    </div>
                                );
                            })}
                        </div>
                    </Pane>
                    {selectedUser && (
                        <Pane
                            elevation={4}
                            float="left"
                            backgroundColor="white"
                            width="60vw"
                            height="90vh"
                            margin={24}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            id="ft"
                        >
                            <div id="msgs">
                                {messages.map((message, index) => {
                                    return (
                                        <>
                                            {last != message.sentBy && (
                                                <Heading size={600}>
                                                    {user.username ===
                                                    message.sentBy
                                                        ? "You"
                                                        : message.sentBy}
                                                </Heading>
                                            )}
                                            <div id="nov">
                                                {(last = message.sentBy)}
                                            </div>
                                            <Text>{message.message}</Text>
                                            <br />
                                            <br />
                                        </>
                                    );
                                })}
                            </div>
                            <div id="send">
                                <TextInput
                                    onChange={e => {
                                        setMessage({
                                            ...message,
                                            [e.target.name]: e.target.value
                                        });
                                    }}
                                    name="message"
                                    width="40vw"
                                    text-align="left"
                                    placeholder="Message here"
                                />
                                {"  "}
                                <Button
                                    intent="success"
                                    onClick={() => sendMessage(message)}
                                    iconAfter={DirectionRightIcon}
                                >
                                    Send
                                </Button>
                            </div>
                        </Pane>
                    )}
                </Pane>
            </div>
        </>
    );
}

export default withRouter(Messages);
