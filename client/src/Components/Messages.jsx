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

const fakeUsers = [
    { name: "mano" },
    { name: "abc" },
    { name: "mabc" },
    { name: "manabc" }
];

let fakeMessages = [
    { mano: "Hi mano", you: "Hii!" },
    { mano: "how are you?", you: "Asdlaishjasd" },
    { mano: "ASdasdasasdasd", you: "Asdlaishjasd" },
    { mano: "ASdasdasasdasd", you: "Asdlaishjasd" },
    { mano: "ASdasdasasdasd", you: "Asdlaishjasd" },
    { mano: "ASdasdasasdasd", you: "Asdlaishjasd" },
    { mano: "ASdasdasasdasd", you: "Asdlaishjasd" },
    { mano: "ASdasdasasdasd", you: "Asdlaishjasd" },
    { mano: "ASdasdasasdasd", you: "Asdlaishjasd" }
];

window.onload = function() {
    var messageBody = document.querySelector(".msger-chat");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
};

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
                        elevation={0}
                        float="left"
                        width="60vw"
                        height="90vh"
                        margin={24}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <section class="msger">
                            <header class="msger-header">
                                <div class="msger-header-title">
                                    <i class="fas fa-comment-alt"></i>{" "}
                                    {selectedUser.name}
                                </div>
                                <div class="msger-header-options">
                                    <span>
                                        <i class="fas fa-cog"></i>
                                    </span>
                                </div>
                            </header>

                            <main class="msger-chat">
                                {fakeMessages.map(message => {
                                    return (
                                        <div id="messages-list">
                                            <div class="msg left-msg">
                                                <div class="msg-bubble">
                                                    <div class="msg-info">
                                                        <div class="msg-info-time">
                                                            12:45
                                                        </div>
                                                    </div>

                                                    <div class="msg-text">
                                                        {message.mano}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="msg right-msg">
                                                <div class="msg-bubble">
                                                    <div class="msg-info">
                                                        <div class="msg-info-time">
                                                            12:46
                                                        </div>
                                                    </div>

                                                    <div class="msg-text">
                                                        {message.you}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </main>

                            <form class="msger-inputarea">
                                <input
                                    type="text"
                                    class="msger-input"
                                    placeholder="Enter your message..."
                                />
                                <button type="submit" class="msger-send-btn">
                                    Send
                                </button>
                            </form>
                        </section>
                    </Pane>
                </Pane>
            </div>
        </>
    );
}

export default withRouter(Messages);
