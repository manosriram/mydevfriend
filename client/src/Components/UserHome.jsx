import React, { useContext, useState, useEffect } from "react";
import {
    Dialog,
    toaster,
    LogInIcon,
    Button,
    TextInput,
    Heading,
    Pane,
    Text
} from "evergreen-ui";
import { Link, withRouter } from "react-router-dom";
import { Messages, UserContext, Navbar } from "./";
import getUser from "../getUser";
import axios from "axios";
import Cookie from "js-cookie";

function UserHome(props) {
    const [match, setMatch] = useState(false);
    const [message, setMessage] = useState("");
    const [submitMessage, setSubmitMessage] = useState(false);

    const matchNow = () => {
        const headers = {
            authorization: "Bearer " + Cookie.get("jtk")
        };
        const res = axios.get("/match/", { headers });
        res.then(result => {
            setMatch(result.data.user);
        }).catch(err => {
            console.log(err);
        });
    };

    const pairWith = () => {
        setSubmitMessage(true);
    };

    if (submitMessage) {
        return (
            <Messages
                matchData={{ match: match, message: message.message }}
                user={props.user}
            />
        );
    }

    if (match) {
        return (
            <Pane>
                <Dialog
                    isShown={match}
                    title={"Paired with " + match}
                    onCloseComplete={() => setMatch(false)}
                    confirmLabel="Send"
                    onConfirm={pairWith}
                >
                    <TextInput
                        width="100%"
                        name="message"
                        placeholder="Say something like hello, world."
                        onChange={e =>
                            setMessage({
                                ...message,
                                [e.target.name]: e.target.value
                            })
                        }
                    />
                    {"  "}
                </Dialog>

                <Button onClick={() => setMatch(true)}>Show Dialog</Button>
            </Pane>
        );
    } else {
        return (
            <>
                <Pane
                    elevation={0}
                    float="left"
                    backgroundColor="white"
                    width="100%"
                    height="auto"
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    {JSON.stringify(props.user)}
                    <br />
                    <Button onClick={matchNow}>find random user</Button>
                </Pane>
            </>
        );
    }
}
export default withRouter(UserHome);
