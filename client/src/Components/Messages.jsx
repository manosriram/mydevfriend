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
    const [selectedUser, setSelectedUser] = useState({});
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
            console.log(result.data.messages[0]);
            setMessages(result.data.messages[0]);
        }).catch(err => {
            console.log(err);
        });
    };

    window.onload = function() {
        // var messageBody = document.querySelector(".msger-chat");
        // messageBody.scrollTop =
        // messageBody.scrollHeight - messageBody.clientHeight;
        // sc();
    };

    function sc() {
        // var el = document.querySelector(".msger-chat");
        // el.addEventListener("scroll", function() {
        // if (el.scrollTop == 0) {
        // setFakeMessages([
        // { mano: "asdnalksndasd1111", you: "yesyesyes" },
        // ...fakeMessages
        // ]);
        // console.log(fakeMessages);
        // }
        // });
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

    const sendMessage = message => {
        const from = user.username,
            to = selectedUser.name;

        socket.emit("message", { from, to, message });
        setMessage([...message, message]);
    };

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
                                                onClick={() =>
                                                    selectUser(fuser.name)
                                                }
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
                            {messages.map(message => {
                                return (
                                    <>
                                        <Heading>mano</Heading>
                                        <Text>{message.message}</Text>
                                        <br />
                                        <br />
                                    </>
                                );
                            })}
                            <TextInput
                                onChange={e => {
                                    setMessage(e.target.value);
                                    console.log(message);
                                }}
                                name="message"
                                width="40vw"
                                placeholder="Message here"
                            />
                            {"  "}
                            <Button onClick={() => sendMessage(message)}>
                                Send
                            </Button>
                        </div>
                    </Pane>
                </Pane>
            </div>
        </>
    );
}

export default withRouter(Messages);
