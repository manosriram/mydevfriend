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
    DirectionRightIcon,
    Pane,
    Text
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

const msgs = [
    "lajdlasjdklasjldjasldjasjdas",
    "lajdlasjdklasjldjasldjasjdas",
    "lajdlasjdklasjldjasldjasjdas",
    "lajdlasjdklasjldjasldjasjdas",
    "lajdlasjdklasjldjasldjasjdas",
    "lajdlasjdklasjldjasldjasjdas",
    "lajdlasjdklasjldjasldjasjdas",
    "lajdlasjdklasjldjasldjasjdas",
    "lajdlasjdklasjldjasldjasjdas",
];

function Messages(props) {
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [messages, setMessages] = useState([]);
    const [shown, setShown] = useState(true);

    const update = () => {
        // setTimeout(() => {
        // setFakeMessages(messages.concat("new concat"));
        // }, 1500);
    };

    useEffect(() => {
        socket.on("message-to", (message, sentBy) => {
            console.log("received " + message);
            // setMessages(msg => [...msg, message]);

            addMessage(message);
        });
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
        console.log(message);
        setMessages(msg => [...msg, message]);


        document.querySelector("#msg").value = "";
        sc();
    };

    const sendMessage = message => {
        if (!message) return;
        const from = user.username,
            to = selectedUser;

        socket.emit("message", { from, to, message: message.message });
    };

    var last;
    return (
        <>
            <div id="container">
                <div id="left">
                    <h1>Users</h1>
                    {fakeUsers.map(fakeUser => {
                        return (
                            <h2 onClick={() => selectUser(fakeUser.name)}>{fakeUser.name}</h2>
                        );
                    })}
                </div>
                {selectedUser && (
                <div id="right">
                    <div class="messages">
                        {messages.map(msg => {
                            return (
                                <>
                                {last !== msg.sentBy && user.username === msg.sentBy && (
                                    <>
                                        <hr />
                                        <h2>You</h2>
                                    </>
                                )}
                                {last !== msg.sentBy && user.username !== msg.sentBy && (
                                    <>
                                        <hr />
                                        <h2>{msg.sentBy}</h2>
                                    </>
                                )}
                                <div id="now-own">
                                    <h3>{msg.message}</h3>
                                </div>
                                <div id="nov">
                                    {last = msg.sentBy}
                                </div>
                                </>
                             )}
                            )}
                    </div>
                    <div class="message-send">
                        <TextInput width="50vw" id="msg" name="message" placeholder="message" onChange={e => setMessage({...message, [e.target.name]: e.target.value})}/>
                        {"   "}
                        <Button onClick={() => sendMessage(message)}>Send</Button>
                    </div>
                </div>
                )}
            </div>
        </>
    );
}

export default withRouter(Messages);
