import { withRouter, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import {
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

function Profile(props) {
    const location = useLocation();
    const [user, setUser] = useState({});
    const [loggedInUser, setLoggedInUser] = useState({});
    const [spin, setSpin] = useState(false);

    const getUserProfile = username => {
        setSpin(true);
        const headers = {
            authorization: "Bearer " + Cookie.get("jtk")
        };
        const res = axios.get(`/user/${username}`, { headers });
        res.then(result => {
            setUser(result.data.user);
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
                <div id="container">
                    <div id="left">
                        <Avatar id="avatar" name={user.username} size={100} />
                        <br />
                        <Heading float="left" size={100} id="intro-text">
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
                        <Icon id="joined-icon" icon={CalendarIcon} />
                        {"  "}
                        <Text id="joined">
                            Joined {moment().format("MMMM Do YYYY", user.dob)}
                        </Text>
                        <br />
                        <Icon id="joined-icon" icon={GlobeNetworkIcon} />
                        {"  "}
                        <Text>{user.location}</Text>
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
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Profile);
