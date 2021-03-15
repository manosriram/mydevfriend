import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import getUser from "../getUser";
import {
    Badge,
    Pill,
    CrossIcon,
    Spinner,
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
import { Helmet } from "react-helmet";
import moment from "moment";

import io from "socket.io-client";
const socket = io(process.env.REACT_APP_ADDR, {
    path: "/socket",
    transports: ["websocket"],
    upgrade: false
});

function Messages(props) {
    const [spin, setSpin] = useState(false);
    const [user, setUser] = useState({});
    const [inputMessage, setInputMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState([]);
    const [userStat, setUserStat] = useState({});

    const getChat = () => {
        try {
            setSpin(true);
            const headers = {
                authorization: "Bearer " + Cookie.get("jtk")
            };
            const res = axios.get("/api/chat/connections", {
                headers
            });
            res.then(result => {
                setChat(result.data.friends);
                setSpin(false);
            }).catch(err => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const getUserStatus = async () => {
        try {
            const headers = {
                authorization: "Bearer " + Cookie.get("jtk")
            };
            const res = axios.get("/api/chat/status", { headers });
            res.then(data => {
                const arr = data.data.userStatus;
                var result = arr.reduce(function(map, obj) {
                    map[obj.username] = obj.status;
                    return map;
                }, {});
                console.log(result);
                setUserStat(result);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const getMessages = async toUser => {
        try {
            const data = {
                from: props.user.username,
                to: toUser
            };
            const headers = {
                authorization: "Bearer " + Cookie.get("jtk")
            };
            const res = axios.post("/api/chat/history", { data }, { headers });
            res.then(result => {
                setMessages(result.data.messages);
                sc();
            }).catch(err => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };

    function sc() {
        var objDiv = document.querySelector(".messages");
        if (objDiv) objDiv.scrollTop = objDiv.scrollHeight;
    }

    const selectUser = user => {
        getMessages(user);
        setSelectedUser(user);
        props.location.state = null;
    };

    const initiateConversation = (u_user1, u_user2) => {
        try {
            const headers = {
                authorization: "Bearer " + Cookie.get("jtk")
            };
            const res = axios.post(
                "/api/chat/createChat",
                {
                    user1: u_user1,
                    user2: props.user.username || u_user2
                },
                { headers }
            );
            res.then(result => {
                if (result.data.code === 1) {
                    selectUser(props.location.state.matchData.match);
                }
                return props.location.state.matchData.message;
            })
                .then(matchMessage => {
                    sendMessage(matchMessage);
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setSpin(true);
        getUserStatus();
        getUser()
            .then(res => {
                setUser(res);
                return res.username;
            })
            .then(usernameViaHistory => {
                if (props.location.state && props.location.state.matchData) {
                    initiateConversation(
                        props.location.state.matchData.match,
                        usernameViaHistory
                    );
                    getChat();
                    setSelectedUser(props.location.state.matchData.match);
                }
            });
    }, []);

    const msgElement = document.querySelector("body");
    if (msgElement) {
        msgElement.addEventListener("keypress", function(event) {
            if (event.keyCode !== 13) {
                document.querySelector("#msg").focus();
            }
        });
    }

    useEffect(() => {
        socket.on("logged-out", () => {
            getUser().then(res => {
                socket.emit("offline", { username: res.username });
            });
        });

        socket.on("message-to", message => {
            console.log(message);
            addMessage(message);
        });

        getChat();
        return () => {
            socket.disconnect();
            socket.off();
        };
    }, []);

    const addMessage = message => {
        setMessages(msg => [...msg, message]);
        sc();
    };

    window.onload = function() {};

    const sendMessage = message => {
        if (!message) return;

        const from = user.username || message.from;
        const to = selectedUser || props.location.state.matchData.match;

        const readUnreadName = `run:${from}:${to}`;
        socket.emit("_message", { from, to, message: message.message });
        const msgElement = document.querySelector("#msg");
        if (msgElement) msgElement.value = "";
        setInputMessage("");
    };

    if (spin) {
        return (
            <Pane
                display="flex"
                alignItems="center"
                justifyContent="center"
                height={400}
            >
                <Spinner />
            </Pane>
        );
    }

    const deactivateChat = deleteUserChat => {
        const headers = {
            authorization: "Bearer " + Cookie.get("jtk")
        };
        const data = {
            activeValue: 0,
            user1: user.username,
            user2: deleteUserChat
        };
        const res = axios.post(`/api/chat/toggleChat`, { data }, { headers });
        res.then(result => {
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
    };

    var last;
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Messages - mydevfriend</title>
                <meta
                    name="description"
                    content="Find a pair-programming partner"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href="./favicons/apple-icon-57x57.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="60x60"
                    href="./favicons/apple-icon-60x60.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="./favicons/apple-icon-72x72.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="./favicons/apple-icon-76x76.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="./favicons/apple-icon-114x114.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="./favicons/apple-icon-120x120.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="./favicons/apple-icon-144x144.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="./favicons/apple-icon-152x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="./favicons/apple-icon-180x180.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="./favicons/android-icon-192x192.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="./favicons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="96x96"
                    href="./favicons/favicon-96x96.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="./favicons/favicon-16x16.png"
                />
                <link rel="manifest" href="./favicons/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta
                    name="msapplication-TileImage"
                    content="./favicons/ms-icon-144x144.png"
                />
            </Helmet>

            <div id="message-container">
                <div id="left">
                    <Heading size={700}>Messages</Heading>
                    <hr />
                    {chat.map(chatUser => {
                        const showUser =
                            chatUser.user1 === user.username
                                ? chatUser.user2
                                : chatUser.user1;
                        const onlineBackground = "#47B881",
                            offlineBackground = "#66788A";
                        return (
                            <>
                                <Heading id="user" size={500}>
                                    <div id="you-user">
                                        <Avatar
                                            name={showUser}
                                            margin-right="2px"
                                        />
                                        <h4
                                            id="sentBy"
                                            onClick={() => selectUser(showUser)}
                                        >
                                            {showUser}
                                            {"  "}
                                            <span
                                                id="status"
                                                style={{
                                                    background:
                                                        chatUser.status ===
                                                        "online"
                                                            ? onlineBackground
                                                            : offlineBackground
                                                }}
                                            ></span>
                                        </h4>
                                        <Text
                                            id="delete-right"
                                            onClick={() =>
                                                deactivateChat(showUser)
                                            }
                                        >
                                            <CrossIcon />
                                        </Text>
                                    </div>
                                </Heading>
                            </>
                        );
                    })}
                </div>
                {!selectedUser && (
                    <div id="no" style={{ margin: "auto" }}>
                        <Text>Select any user to show conversations.</Text>
                    </div>
                )}
                <div id="messageboxright">
                    {selectedUser && (
                        <div id="right">
                            <div class="messages">
                                {!messages.length && (
                                    <div id="no">
                                        <Text>
                                            No conversations with {selectedUser}{" "}
                                            yet :(
                                        </Text>
                                    </div>
                                )}
                                {messages.map((msg, msgIndex) => {
                                    console.log(msg);
                                    return (
                                        <>
                                            {last !== msg.sentBy &&
                                                user.username ===
                                                    msg.sentBy && (
                                                    <div id="you-user">
                                                        {msgIndex != 0 && (
                                                            <hr />
                                                        )}
                                                        <Avatar
                                                            name={user.username}
                                                            margin-right="2px"
                                                        />
                                                        <h4 id="sentBy">You</h4>
                                                    </div>
                                                )}
                                            {last !== msg.sentBy &&
                                                user.username !==
                                                    msg.sentBy && (
                                                    <div className="not-own-name">
                                                        {msgIndex != 0 && (
                                                            <hr />
                                                        )}
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
                                                    <span id="sent">
                                                        {moment(
                                                            msg.created_at
                                                        ).format(
                                                            "DD/MM/YY, hh:mm a"
                                                        )}
                                                    </span>
                                                </Text>
                                            </div>
                                            <div id="nov">
                                                {(last = msg.sentBy)}
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    )}
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
                            type="textarea"
                            autocomplete="off"
                            onChange={e =>
                                setInputMessage({
                                    ...inputMessage,
                                    [e.target.name]: e.target.value
                                })
                            }
                            onKeyUp={e => {
                                if (e.keyCode === 13) {
                                    document
                                        .querySelector("#send-button")
                                        .click();
                                }
                            }}
                        />
                        {"   "}
                        <Button
                            id="send-button"
                            iconAfter={DoubleChevronUpIcon}
                            onClick={() => sendMessage(inputMessage, undefined)}
                        >
                            Send
                        </Button>
                        {"   "}
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(Messages);
