import { withRouter } from "react-router-dom";
import { Navbar } from "./";
import { useState, useEffect } from "react";
import getUser from "../getUser";
import {
    Avatar,
    Card,
    Position,
    Paragraph,
    SideSheet,
    toaster,
    LogInIcon,
    Button,
    TextInput,
    Heading,
    DoubleChevronLeftIcon,
    DirectionRightIcon,
    Pane,
    Text
} from "evergreen-ui";
import "../Styles/Messages.css";
import { Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import { ChatFeed, Message } from "react-chat-ui";
import axios from "axios";
import Cookie from "js-cookie";
import io from "socket.io-client";
const socket = io("http://localhost:5454", {
    transports: ["websocket", "polling", "flashsocket"]
});

const fakeUsers = [
    { name: "sriram123" },
    { name: "abc" },
    { name: "mabc" },
    { name: "sriram" }
];

function Messages(props) {
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [messages, setMessages] = useState([{}]);
    const [shown, setShown] = useState(true);

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
        const headers = {
            authorization: "Bearer " + Cookie.get("jtk")
        };
        const res = axios.post("/chat/history", { data }, { headers });
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
            `<Text id="msg-listed">${message}</Text><br /><br />`
        );
        sc();
        document.querySelector("#msg").value = "";
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
            <div id="container">
                <Pane id="con" clearfix>
                    <SideSheet
                        isShown={shown}
                        onCloseComplete={() => setShown(false)}
                        containerProps={{
                            display: "flex",
                            flex: "1",
                            flexDirection: "column"
                        }}
                    >
                        <Pane
                            zIndex={1}
                            flexShrink={0}
                            elevation={0}
                            backgroundColor="white"
                        >
                            <Pane padding={16}>
                                <Heading size={600}>Title</Heading>
                                <Paragraph size={400}>
                                    Optional description or sub title
                                </Paragraph>
                            </Pane>
                        </Pane>
                        <Pane
                            flex="1"
                            overflowY="scroll"
                            background="tint1"
                            padding={16}
                        >
                            {fakeUsers.map(fuser => {
                                return (
                                    <Card
                                        backgroundColor="white"
                                        elevation={0}
                                        height={50}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Avatar name={fuser.name} size={35} />
                                        <div id="user">
                                            <Text
                                                id="username-msg"
                                                size={600}
                                                onClick={() => {
                                                    selectUser(fuser.name);
                                                }}
                                            >
                                                {fuser.name}
                                            </Text>
                                            <br />
                                        </div>
                                    </Card>
                                );
                            })}
                        </Pane>
                    </SideSheet>

                    {selectedUser && (
                        <Pane
                            elevation={0}
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
                                                <Heading size={700}>
                                                    {user.username ===
                                                    message.sentBy
                                                        ? "You"
                                                        : message.sentBy}
                                                </Heading>
                                            )}
                                            <div id="nov">
                                                {(last = message.sentBy)}
                                            </div>
                                            <Text id="msg-listed">
                                                {message.message}
                                            </Text>
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
                                    id="msg"
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
                            <Button
                                id="show-chat"
                                iconBefore={DoubleChevronLeftIcon}
                                onClick={() => setShown(true)}
                            >
                                Chat
                            </Button>
                        </Pane>
                    )}
                </Pane>
            </div>
        </>
    );
}

export default withRouter(Messages);
