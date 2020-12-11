import "../Styles/App.css";
import {
    toaster,
    LogInIcon,
    Button,
    TextInput,
    Heading,
    Pane,
    Text
} from "evergreen-ui";
import { withRouter, NavLink } from "react-router-dom";
import { Form, Formik } from "formik";
import axios from "axios";
import Cookie from "js-cookie";
import getUser from "../getUser";
import { useState, useEffect } from "react";

const forbiddenToast = { id: "forbidden-action" };

function Home(props) {
    const submitForm = data => {
        const res = axios.post("/auth/login", { data });
        res.then(result => {
            toaster.success(result.data.message, forbiddenToast);
            Cookie.set("jtk", result.data.token);
            props.history.push({
                pathname: "/home"
            });
        }).catch(err => {
            if (err.response && err.response.data)
                toaster.danger(err.response.data.message, forbiddenToast);
        });
    };

    useEffect(() => {
        getUser().then(res => {
            if (res.username) {
                props.history.push("/home");
            }
        });
    }, []);

    return (
        <div id="container">
            <Pane clearfix>
                <Pane
                    elevation={0}
                    float="left"
                    backgroundColor="white"
                    width="40vw"
                    height="40vh"
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Heading size={900}>foundbug</Heading>
                    <Heading size={800}>
                        Find a Pair-Programming partner anywhere in this world!
                    </Heading>
                </Pane>
                <Pane
                    elevation={0}
                    float="left"
                    width="40vw"
                    height="40vh"
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Formik
                        initialValues={{
                            username: "",
                            password: ""
                        }}
                        onSubmit={async (
                            data,
                            { setSubmitting, resetForm }
                        ) => {
                            setSubmitting(true);
                            await submitForm(data);
                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            handleBlur
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <TextInput
                                    name="username"
                                    placeholder="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <br />
                                <TextInput
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <br />
                                <Button
                                    name="login"
                                    iconBefore={LogInIcon}
                                    appearance="primary"
                                    type="submit"
                                >
                                    Login
                                </Button>
                                <br />
                                <br />
                                <NavLink
                                    to="/create"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button intent="success">
                                        Create a free account
                                    </Button>
                                </NavLink>
                            </Form>
                        )}
                    </Formik>
                </Pane>
            </Pane>
        </div>
    );
}

export default withRouter(Home);
