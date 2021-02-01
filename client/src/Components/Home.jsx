import { Helmet } from "react-helmet";
import "../Styles/App.css";
import {
    Spinner,
    toaster,
    LogInIcon,
    Button,
    TextInput,
    Heading,
    Pane,
    Text
} from "evergreen-ui";
import { Link, withRouter, NavLink } from "react-router-dom";
import { Form, Formik } from "formik";
import axios from "axios";
import Cookie from "js-cookie";
import getUser from "../getUser";
import { Suspense, useState, useEffect } from "react";
import sideBg from "../Assets/side-bg.png";
require("dotenv").config();

const forbiddenToast = { id: "forbidden-action" };

function Home(props) {
    const [spin, setSpin] = useState(false);

    const submitForm = data => {
        try {
            setSpin(true);
            const res = axios.post("/api/auth/login", {
                data
            });
            res.then(result => {
                console.log(result);
                toaster.success(result.data.message, forbiddenToast);
                Cookie.set("jtk", result.data.token);
                props.history.push({
                    pathname: "/home"
                });
                setSpin(false);
            }).catch(err => {
                if (err.response && err.response.data)
                    toaster.danger(err.response.data.message, forbiddenToast);

                setSpin(false);
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setSpin(true);
        getUser().then(res => {
            if (res.username) {
                props.history.push("/home");
            }
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
            <div className="wrapper cf">
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
                <div id="sidebg-wrapper">
                    <img src={sideBg} alt="" id="sidebg" />
                    <Heading id="intro-text" size={100}>
                        <strong>
                            mydevfriend connects you with developers all around
                            the world.
                        </strong>
                    </Heading>
                </div>
                <div className="home-container" id="home-container">
                    <Pane clearfix>
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
                            <Heading
                                className="welcome-title"
                                id="welcome"
                                size={100}
                            >
                                mydevfriend
                            </Heading>
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
                                    submitForm(data);
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
                                            <br />
                                            <br />
                                            <Link id="about-link" to="/about">
                                                <Text>About</Text>
                                            </Link>
                                            <Link id="about-link" to="/cookie">
                                                <Text>Cookie Policy</Text>
                                            </Link>
                                        </NavLink>
                                    </Form>
                                )}
                            </Formik>
                        </Pane>
                    </Pane>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
