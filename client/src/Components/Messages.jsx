import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import getUser from "../getUser";
import {
    Tab,
    TabNavigation,
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
    DoubleChevronDownIcon,
    DirectionRightIcon,
    Pane,
    Text,
    DoubleChevronUpIcon
} from "evergreen-ui";
import "../Styles/Messages.css";
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
    const [inputMessage, setInputMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message-to", (message, sentBy) => {
            addMessage(message);
        });

        return () => {
            socket.off();
        };
    }, []);

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
        var objDiv = document.querySelector(".messages");
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
        setMessages(msg => [...msg, message]);
        sc();
    };

    const sendMessage = message => {
        if (!message) return;
        const from = user.username,
            to = selectedUser;

        socket.emit("message", { from, to, message: message.message });
        document.querySelector("#msg").value = "";
    };

    var last;
    return (
        <>
            <div id="container">
                <div id="left">
                    <Heading size={700}>Messages</Heading>
                    {fakeUsers.map(fakeUser => {
                        return (
                            <Heading
                                id="user"
                                size={500}
                                onClick={() => selectUser(fakeUser.name)}
                            >
                                {fakeUser.name}
                            </Heading>
                        );
                    })}
                </div>
                {selectedUser && (
                    <div id="right">
                        <div class="messages">
                            {messages.map(msg => {
                                return (
                                    <>
                                        {last !== msg.sentBy &&
                                            user.username === msg.sentBy && (
                                                <div id="you-user">
                                                    <hr />
                                                    <Avatar
                                                        name={user.username}
                                                        margin-right="2px"
                                                    />
                                                    <h4 id="sentBy">You</h4>
                                                </div>
                                            )}
                                        {last !== msg.sentBy &&
                                            user.username !== msg.sentBy && (
                                                <div className="not-own-name">
                                                    <hr />
                                                    <Avatar
                                                        name={msg.sentBy}
                                                        vertical-align="middle"
                                                    />
                                                    {"   "}
                                                    <h4 id="sentBy">
                                                        {msg.sentBy}
                                                    </h4>
                                                </div>
                                            )}
                                        <div id="now-own">
                                            <Text id="msg-text">
                                                {msg.message}
                                            </Text>
                                        </div>
                                        <div id="nov">
                                            {(last = msg.sentBy)}
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                        <div class="message-send">
                            <i
                                onClick={() => sc()}
                                id="down-down"
                                class="fas fa-chevron-down fa-2x"
                            ></i>
                            <TextInput
                                width="50vw"
                                id="msg"
                                name="message"
                                placeholder="message"
                                onChange={e =>
                                    setInputMessage({
                                        ...inputMessage,
                                        [e.target.name]: e.target.value
                                    })
                                }
                            />
                            {"   "}
                            <Button
                                iconAfter={DoubleChevronUpIcon}
                                onClick={() => sendMessage(inputMessage)}
                            >
                                Send
                            </Button>
                            {"   "}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default withRouter(Messages);
