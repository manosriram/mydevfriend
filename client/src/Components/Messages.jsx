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

const fakeUsers = [
    { name: "mano" },
    { name: "abc" },
    { name: "mabc" },
    { name: "manabc" }
];

function Messages(props) {
    const [user, setUser] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [fakeMessages, setFakeMessages] = useState([
        "lasdjlajdlak dlajsdkajsljlaksjlkajsdj alsjdas",
        "lasdjlajdlak dlajsdkajsljlaksjlkajsdj alsjdas",
        "lasdjlajdlak dlajsdkajsljlaksjlkajsdj alsjdas",
        "lasdjlajdlak dlajsdkajsljlaksjlkajsdj alsjdas",
        "lasdjlajdlak dlajsdkajsljlaksjlkajsdj alsjdas",
        "lasdjlajdlak dlajsdkajsljlaksjlkajsdj alsjdas",
        "lasdjlajdlak dlajsdkajsljlaksjlkajsdj alsjdas",
        "lasdjlajdlak dlajsdkajsljlaksjlkajsdj alsjdas",
        "lasdjlajdlak dlajsdkajsljlaksjlkajsdj alsjdas",
        "lasdjlajdlak dlajsdkajsljlaksjlkajsdj alsjdas"
    ]);

    const update = () => {
        setTimeout(() => {
            setFakeMessages(fakeMessages.concat("new concat"));
        }, 1500);
    };

    window.onload = function() {
        // var messageBody = document.querySelector(".msger-chat");
        // messageBody.scrollTop =
        // messageBody.scrollHeight - messageBody.clientHeight;
        // sc();
    };
    function sc() {
        var el = document.querySelector(".msger-chat");
        el.addEventListener("scroll", function() {
            if (el.scrollTop == 0) {
                setFakeMessages([
                    { mano: "asdnalksndasd1111", you: "yesyesyes" },
                    ...fakeMessages
                ]);
                console.log(fakeMessages);
            }
        });
    }

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
                            {fakeMessages.map(message => {
                                return (
                                    <>
                                        <Text>{message}</Text>
                                        <br />
                                        <br />
                                    </>
                                );
                            })}
                            <TextInput
                                width="40vw"
                                placeholder="Message here"
                            />
                            {"  "}
                            <Button>Send</Button>
                        </div>
                    </Pane>
                </Pane>
            </div>
        </>
    );
}

export default withRouter(Messages);
