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
import {
    UserLink,
    LinkComponent
} from "../Styles/StyledComponents/UserHome.js";
import moment from "moment";

function UserHome(props) {
    const [spin, setSpin] = useState(false);
    const [match, setMatch] = useState("");
    const [submitMessage, setSubmitMessage] = useState(false);
    const [newUsers, setNewUsers] = useState([]);

    const getNewUsers = () => {
        axios.get("/api/user/latest").then(data => {
            setNewUsers(data.data.latestUsers);
        });
    };

    useEffect(() => {
        getNewUsers();
    }, []);

    const matchNow = () => {
        setSpin(true);
        const headers = {
            authorization: "Bearer " + Cookie.get("jtk")
        };
        const res = axios.get("/api/match/", {
            headers
        });
        res.then(result => {
            setMatch(result.data.user);
            setSpin(false);
        }).catch(err => {
            console.log(err);
            setSpin(false);
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

    if (match !== "") {
        props.history.push({
            pathname: "/messages",
            state: {
                matchData: {
                    match: match
                }
            }
        });
    }
    return (
        <div id="user-home-container">
            <Helmet>
                <meta charSet="utf-8" />
                <title>mydevfriend</title>
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
            <div id="left-home">
                <LinkComponent href="/find">Find users</LinkComponent>
                <hr />
                <LinkComponent onClick={matchNow}>
                    Match with a random user
                </LinkComponent>
            </div>
            <div id="right-home">
                <Heading size={500} color="black">
                    New users
                </Heading>
                <hr />
                {newUsers.map(user => {
                    const url = `http://localhost:3000/user/${user.username}`;
                    return (
                        <div id="latest">
                            <Heading size={100} id="user">
                                <UserLink href={url}>{user.username}</UserLink>
                            </Heading>
                            <Text>
                                joined{" "}
                                {moment(user.created).format("MMMM Do, YYYY")}
                            </Text>
                            <br />
                        </div>
                    );
                })}
            </div>
            <div id="below-home">
                <Heading id="update" size={100}>
                    Stay tuned for more updates.
                </Heading>
            </div>
        </div>
    );
}
export default withRouter(UserHome);
