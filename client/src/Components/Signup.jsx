import React from "react";
import { Form, Formik } from "formik";
import { AddIcon, Select, Button, TextInput } from "evergreen-ui";
import "../Styles/App.css";

function Signup() {
    return (
        <>
            <h1>Create a free account</h1>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    dob: "",
                    location: "",
                    gender: "",
                    username: "",
                    password: ""
                }}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    // async submission here.
                    console.log(data);
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
                            placeholder="Password"
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
                        {"  "}
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
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Signup;
