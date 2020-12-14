const express = require("express");
const router = express.Router();
const yup = require("yup");
const jwt = require("jsonwebtoken");

const signUpSchema = yup.object().shape({
    username: yup
        .string()
        .matches(/^[A-Za-z0-9]*$/, "Special characters not allowed")
        .min(4, "Username must atleast be of length 4")
        .max(32, "Username should not exceed length 32")
        .required(),
    password: yup
        .string()
        .min(4, "Password must atleast be of length 4")
        .max(32, "Password should not exceed length 32")
        .required(),
    email: yup
        .string()
        .email("Email not in format")
        .required(),
    location: yup.string().required(),
    firstName: yup
        .string()
        .required()
        .max(32, "First Name should not exceed length 32"),
    lastName: yup
        .string()
        .required()
        .max(32, "Last Name should not exceed length 32"),
    dob: yup.string().required()
});

const loginSchema = yup.object().shape({
    username: yup
        .string()
        .matches(/^[A-Za-z0-9]*$/, "Special characters not allowed")
        .min(4, "Username must atleast be of length 4")
        .max(32, "Username should not exceed length 32")
        .required(),
    password: yup
        .string()
        .min(4, "Password must atleast be of length 4")
        .max(32, "Password should not exceed length 32")
        .required()
});

router.get("/user", (req, res, next) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];
    jwt.verify(token, "secret", (err, user) => {
        let status = 403;
        if (user) status = 200;
        if (!err) return res.status(status).json({ user: user || null });
        else next(err);
    });
});

router.post("/signup", async (req, res, next) => {
    try {
        const {
            username,
            password,
            email,
            location,
            firstName,
            lastName,
            dob,
            gender
        } = req.body.data;
        signUpSchema.validateSync({
            username,
            password,
            email,
            location,
            firstName,
            lastName,
            dob,
            gender
        });
        const connection = req.connection;

        connection
            .query(
                "INSERT INTO user(username, email, password, location, dob, firstName, lastName, gender) values(?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    username,
                    email,
                    password,
                    location,
                    dob,
                    firstName,
                    lastName,
                    gender
                ]
            )
            .then(
                rows => {
                    return res.status(201).json({
                        success: true,
                        message: "User created"
                    });
                },
                err => {
                    if (err.errno === 1062) next(new Error("username exists"));
                    else next(new Error("some error occured"));
                }
            );
    } catch (err) {
        next(err);
    }
});

router.post("/login", (req, res, next) => {
    const { username, password } = req.body.data;

    loginSchema.validateSync({ username, password });

    const connection = req.connection;
    connection
        .query("select * from user where username = ? and password = ?", [
            username,
            password
        ])
        .then(
            rows => {
                if (rows[0]) {
                    // JWT

                    const {
                        firstName,
                        lastName,
                        email,
                        location,
                        dob,
                        gender
                    } = rows[0];
                    const userPayload = {
                        username,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        location: location,
                        dob: dob,
                        gender: gender
                    };
                    const token = jwt.sign(userPayload, "secret", {
                        expiresIn: "1d"
                    });

                    return res.status(200).json({
                        success: true,
                        message: "Logged-In successfully",
                        token
                    });
                } else {
                    next(new Error("incorrect credentials"));
                }
            },
            err => {
                next(new Error(err));
            }
        );
});

module.exports = router;
