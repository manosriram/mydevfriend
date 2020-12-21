import React, { useState } from "react";
import { Form, Formik } from "formik";
import {
    Heading,
    toaster,
    Text,
    AddIcon,
    Select,
    Button,
    Textarea,
    TextInput
} from "evergreen-ui";
import "../Styles/App.css";
import { withRouter, NavLink } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const forbiddenToast = { id: "forbidden-action" };

function Signup(props) {
    const [resend, setResend] = useState(false);
    const [email, setEmail] = useState("");

    const resendMail = () => {
        const res = axios.post("/auth/resendMail", { email });
        res.then(result => {
            toaster.success(result.data.message, forbiddenToast);
        }).catch(err => {
            if (err.response && err.response.data)
                toaster.danger(err.response.data.message, forbiddenToast);
        });
    };

    const submitForm = async data => {
        const res = axios.post("/auth/signup", { data });
        setEmail(data.email);
        res.then(result => {
            toaster.success(result.data.message, forbiddenToast);
            setResend(true);
            // props.history.push("/");
        }).catch(err => {
            if (err.response && err.response.data)
                toaster.danger(err.response.data.message, forbiddenToast);
        });
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create a free account - codealone</title>
                <meta
                    name="description"
                    content="Create a free account - codealone"
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
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    dob: "",
                    location: "",
                    gender: "",
                    username: "",
                    password: "",
                    bio: ""
                }}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    // async submission here.
                    await submitForm(data);
                    setSubmitting(false);
                    // resetForm();
                }}
            >
                {({ values, handleChange, handleSubmit, handleBlur }) => (
                    <Form id="form-container">
                        <Heading id="welcome" size={100}>
                            Create a free account
                        </Heading>
                        <TextInput
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="firstName"
                            placeholder="First Name"
                        />
                        {"  "}
                        <TextInput
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="lastName"
                            placeholder="Last Name"
                        />
                        <br />
                        <br />
                        <TextInput
                            style={{ width: "100%" }}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            placeholder="Email Address"
                        />
                        <br />
                        <br />
                        <TextInput
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="username"
                            placeholder="Username"
                        />
                        {"  "}
                        <TextInput
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <br />
                        <br />
                        <Textarea
                            name="bio"
                            placeholder="bio"
                            value={values.bio}
                            onChange={handleChange}
                        />

                        <br />
                        <br />
                        <TextInput
                            width="auto"
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="location"
                            placeholder="Location"
                        />
                        {"  "}
                        <Select name="gender" onChange={handleChange}>
                            <option selected disabled value="Gender">
                                Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Select>
                        <br />
                        <br />
                        <Text>Date of Birth</Text>
                        {"  "}
                        <br />
                        <input
                            type="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="dob"
                        />
                        <br />
                        <br />
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            value="Create"
                            intent="success"
                            appearance="primary"
                            iconBefore={AddIcon}
                        >
                            Create free account
                        </Button>
                        <br />
                        <br />
                        <NavLink to="/" style={{ color: "blue" }}>
                            Back to Login
                        </NavLink>
                        {"  "}
                        {resend && (
                            <NavLink
                                onClick={resendMail}
                                to="#"
                                style={{ color: "blue" }}
                            >
                                Resend activation email
                            </NavLink>
                        )}
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default withRouter(Signup);
