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
import { UserContext, Navbar } from "./";
import getUser from "../getUser";
import axios from "axios";
import Cookie from "js-cookie";

function UserHome(props) {
    const [match, setMatch] = useState(false);

    const matchNow = () => {
        const { username } = props.user;

        const headers = {
            authorization: "Bearer " + Cookie.get("jtk")
        };
        const res = axios.get("/match/", { headers });
        res.then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });

        setMatch(true);
    };

    if (match) {
        return (
            <Pane>
                <Dialog
                    isShown={match}
                    title="Matched with a dev!"
                    onCloseComplete={() => setMatch(false)}
                    confirmLabel="Send"
                >
                    <TextInput
                        width="100%"
                        name="firstHi"
                        placeholder="Say something like hello, world."
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
