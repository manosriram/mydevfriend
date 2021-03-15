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

function Forgot(props) {
    const submitForm = e => {
        const data = {
            email: e.email
        };
        const headers = {
            authorization: "Bearer " + Cookie.get("jtk")
        };
        const res = axios.post("/api/auth/forgot", { data }, { headers });
        res.then(result => {
            if (result.data.success)
                toaster.success(result.data.message, forbiddenToast);
            else toaster.danger(result.data.message, forbiddenToast);
        });
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: ""
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
                            style={{ width: "100%" }}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            placeholder="Email Address"
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
                            Send confirmation email
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

export default Forgot;
