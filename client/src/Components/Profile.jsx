import { Link, withRouter, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import {
    UserIcon,
    Badge,
    Spinner,
    GlobeNetworkIcon,
    Icon,
    CalendarIcon,
    Pane,
    Button,
    Avatar,
    Text,
    Heading,
    Dialog,
    TextInput
} from "evergreen-ui";
import moment from "moment";
import "../Styles/Profile.css";
import getUser from "../getUser";
import { Messages } from "./";
import { Helmet } from "react-helmet";

function Profile(props) {
    const location = useLocation();
    const [user, setUser] = useState({});
    const [languages, setLanguages] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [spin, setSpin] = useState(false);

    const getUserProfile = username => {
        setSpin(true);
        const headers = {
            authorization: "Bearer " + Cookie.get("jtk")
        };
        const res = axios.get(`/api/user/${username}`, {
            headers
        });
        res.then(result => {
            setUser(result.data.user);
            setLanguages(result.data.languages);
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        const username = location.pathname.split("/")[2];

        getUserProfile(username);
        getUser()
            .then(res => {
                setLoggedInUser(res);
            })
            .then(() => {
                setSpin(false);
            })
            .catch(err => {
                console.log(err);
            });
        setSpin(false);
    }, []);

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
    } else {
        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>About - mydevfriend</title>
                    <meta
                        name="description"
                        content="About Page - mydevfriend"
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
                <div id="container">
                    <div id="left-prof">
                        <div id="avatar">
                            <Avatar
                                id="avatar"
                                name={user.username}
                                size={100}
                            />
                        </div>
                        <br />
                        <Heading
                            id="user-profile-title"
                            float="left"
                            size={100}
                        >
                            {user.firstName} {"  "} {user.lastName}
                        </Heading>
                        <br />
                        <Text>
                            @<strong>{user.username}</strong>
                        </Text>
                        <br />
                        <div id="bio">
                            <div>
                                <Text size={50}>{user.bio}</Text>
                            </div>
                        </div>

                        <div id="badge-container">
                            {languages.map(lang => {
                                return (
                                    <div id="badges">
                                        <Badge
                                            color="yellow"
                                            isSolid
                                            marginRight={8}
                                        >
                                            {lang.language}
                                        </Badge>
                                    </div>
                                );
                            })}
                        </div>
                        <br />
                        {"  "}
                        <Icon id="joined-icon" icon={CalendarIcon} />
                        {"  "}
                        <Text id="joined">
                            Joined{" "}
                            {moment(user.created).format("MMMM Do, YYYY")}
                        </Text>
                        <br />
                        <Icon id="joined-icon" icon={UserIcon} />
                        {"  "}
                        <Text id="joined">{user.email}</Text>
                        <br />
                        <Icon id="joined-icon" icon={GlobeNetworkIcon} />
                        {"  "}
                        <Text>{user.location}</Text>
                        {console.log(loggedInUser)}
                        {loggedInUser.username ? (
                            <Button
                                onClick={() => {
                                    props.history.push({
                                        pathname: "/messages",
                                        state: {
                                            matchData: {
                                                match: user.username
                                            }
                                        }
                                    });
                                }}
                                id="message-user"
                                intent="success"
                            >
                                Message {user.username}
                            </Button>
                        ) : (
                            <Heading size={600} id="find-devs">
                                <Link to="/create">Create</Link> an account to
                                find more developers!
                            </Heading>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Profile);
