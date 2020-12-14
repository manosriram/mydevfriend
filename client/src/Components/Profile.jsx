import { useState, useEffect } from "react";
import { withRouter, NavLink } from "react-router-dom";
import getUser from "../getUser";
import { Navbar } from "./";
import "../Styles/Profile.css";
import {
    FilePicker,
    Avatar,
    toaster,
    Text,
    AddIcon,
    Select,
    Button,
    TextInput
} from "evergreen-ui";
import { Form, Formik } from "formik";
import axios from "axios";

const forbiddenToast = { id: "forbidden-action" };
function Profile(props) {
    const submitForm = async data => {
        console.log(props.user);
        const updatedData = {
            firstName: data.firstName || props.user.firstName,
            lastName: data.lastName || props.user.lastName,
            location: data.location || props.user.location,
            username: data.username || props.user.username,
            email: props.user.email,
            gender: data.gender || props.user.gender
        };
        const res = axios.put("/user/profile", { data: updatedData });
        res.then(result => {
            toaster.success(result.data.message, forbiddenToast);
            props.history.push("/");
        }).catch(err => {
            if (err.response && err.response.data)
                toaster.danger(err.response.data.message, forbiddenToast);
        });
    };

    return (
        <div>
            <Formik
                initialValues={{
                    firstName: props.user.firstName,
                    lastName: props.user.lastName,
                    username: props.user.username,
                    location: props.user.location,
                    gender: props.user.location
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
                        <TextInput
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="firstName"
                            placeholder={props.user.firstName}
                        />
                        {"  "}
                        <TextInput
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="lastName"
                            placeholder={props.user.lastName}
                        />
                        <br />
                        <br />
                        <TextInput
                            width="auto"
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="location"
                            placeholder={props.user.location}
                        />
                        {"  "}
                        <TextInput
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="username"
                            placeholder={props.user.username}
                        />
                        {"  "}
                        <Select name="gender" onChange={handleChange}>
                            <option selected disabled value={props.user.gender}>
                                {props.user.gender}
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Select>
                        <br />
                        <br />
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            value="Create"
                            intent="warning"
                            appearance="warning"
                            iconBefore={AddIcon}
                        >
                            Update Profile
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default withRouter(Profile);
