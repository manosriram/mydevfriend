import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";
import { Helmet } from "react-helmet";
import "../Styles/App.css";
import {
    GeolocationIcon,
    AddIcon,
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
require("dotenv").config();

const forbiddenToast = { id: "forbidden-action" };

function Reset(props) {
    const { token } = useParams();
    const loc = useLocation();

    const submitForm = e => {
        const { password, confirm_password } = e;
        if (!password && !confirm_password) {
            toaster.danger("Passwords empty", forbiddenToast);
        } else if (password !== confirm_password) {
            toaster.danger("Passwords don't match", forbiddenToast);
        } else {
            const headers = {
                authorization: "Bearer " + Cookie.get("jtk")
            };
            const data = {
                password: password
            };
            const res = axios.post(
                `/api/auth/forgot/${token}${loc.search}`,
                { data },
                { headers }
            );
            res.then(result => {
                if (result.data.success)
                    toaster.success(result.data.message, forbiddenToast);
                else toaster.danger(result.data.message, forbiddenToast);
            });
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    password: "",
                    confirm_password: ""
                }}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    // async submission here.
                    submitForm(data);
                    setSubmitting(false);
                    // resetForm();
                }}
            >
                {({ values, handleChange, handleSubmit, handleBlur }) => (
                    <Form id="form-container">
                        <Heading id="welcome" size={100}>
                            Forgot Password
                        </Heading>
                        <TextInput
                            type="password"
                            style={{ width: "100%" }}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            placeholder="Password"
                        />
                        <br />
                        <br />
                        <TextInput
                            type="password"
                            style={{ width: "100%" }}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="confirm_password"
                            placeholder="Confirm Password"
                        />
                        <br />
                        <br />
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            value="Create"
                            intent="success"
                            appearance="primary"
                            iconBefore={GeolocationIcon}
                        >
                            Reset Password
                        </Button>
                        <br />
                        <br />
                        <NavLink to="/" style={{ color: "blue" }}>
                            Back to Login
                        </NavLink>
                        {"  "}
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Reset;
