import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import {
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
    const [message, setMessage] = useState("");
    const [messageInit, setMessageInit] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const getUserProfile = username => {
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

    const initMessage = () => {
        setMessageInit(true);
    };

    const confirmMessage = () => {
        setConfirmed(true);
    };

    useEffect(() => {
        const username = location.pathname.split("/")[2];

        getUserProfile(username);
        getUser()
            .then(res => {
                setLoggedInUser(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (confirmed) {
        return (
            <Messages
                matchData={{ match: user.username, message: message.message }}
                user={loggedInUser}
            />
        );
    }
    if (messageInit) {
        return (
            <Pane>
                <Dialog
                    isShown={messageInit}
                    title={"Message " + user.username}
                    onCloseComplete={() => setMessageInit(false)}
                    confirmLabel="Send"
                    onConfirm={confirmMessage}
                >
                    <TextInput
                        width="100%"
                        name="message"
                        placeholder="Your message"
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
                            <Pane elevation={1}>
                                <Text size={50}>
                                    alsjdlasjdl jalsdj lasjdlasjl ajdl ajsldjlAA
                                    <br />
                                    alsjdlasjdl jalsdj lasjdlasjl ajdl ajsldjl
                                    asdjlasjdl
                                </Text>
                            </Pane>
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
                            onClick={initMessage}
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

export default Profile;
