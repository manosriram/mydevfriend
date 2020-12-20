import React, { useContext, useState, useEffect } from "react";
import {
    Spinner,
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
import { Helmet } from "react-helmet";

function UserHome(props) {
    const [spin, setSpin] = useState(false);
    const [match, setMatch] = useState(false);
    const [message, setMessage] = useState("");
    const [submitMessage, setSubmitMessage] = useState(false);

    const matchNow = () => {
        setSpin(true);
        const headers = {
            authorization: "Bearer " + Cookie.get("jtk")
        };
        const res = axios.get("/match/", { headers });
        res.then(result => {
            setMatch(result.data.user);
            setSpin(false);
        }).catch(err => {
            console.log(err);
        });
    };

    const pairWith = () => {
        setSubmitMessage(true);
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
            </Pane>
        );
    } else {
        return (
            <div id="user-home-container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>codealone</title>
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

                <a href="#" onClick={matchNow}>
                    find random user
                </a>
            </div>
        );
    }
}
export default withRouter(UserHome);
