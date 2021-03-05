const express = require("express");
const router = express.Router();
const yup = require("yup");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { encryptBuffer, decryptBuffer } = require("../utils/encdec");
const bcrypt = require("bcryptjs");

const signUpSchema = yup.object().shape({
    username: yup
        .string()
        .matches(/^[A-Za-z0-9_.]*$/, "Special characters not allowed")
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
    lastName: yup.string().max(32, "Last Name should not exceed length 32"),
    dob: yup.string().required(),
    bio: yup.string().max(264, "Bio must be less than 264 characters")
});

const loginSchema = yup.object().shape({
    username: yup
        .string()
        .matches(/^[A-Za-z0-9_.]*$/, "Special characters not allowed")
        .min(4, "Username must atleast be of length 4")
        .max(32, "Username should not exceed length 32")
        .required(),
    password: yup
        .string()
        .min(4, "Password must atleast be of length 4")
        .max(32, "Password should not exceed length 32")
        .required()
});

const sendMailWithEmail = email => {
    const id = encryptBuffer(email, "mano1234");
    const url = `Click to verify: http://localhost:5454/api/auth/verifyUser/${id}/`;

    sendMail("Activate Account - mydevfriend", url, email);
    return;
};

router.post("/mail", async (req, res) => {
    if (!req.body.email)
        return res
            .status(200)
            .json({ success: false, message: "email required" });
    sendMailWithEmail(req.body.email);
    return res
        .status(200)
        .json({ success: true, message: "Activation email sent" });
});

router.get("/user", (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        token = token.split(" ")[1];
        jwt.verify(token, "secret", (err, user) => {
            let status = 403;
            if (user) status = 200;
            if (!err) return res.status(status).json({ user: user || null });
            else next(err);
        });
    } catch (err) {
        next(err);
    }
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
            gender,
            bio
        } = req.body.data;
        const { languages } = req.body;

        signUpSchema.validateSync({
            username,
            password,
            email,
            location,
            firstName,
            lastName,
            dob,
            gender,
            bio
        });
        const connection = req.connection;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        connection
            .query(
                "INSERT INTO user(username, email, password, location, dob, firstName, lastName, gender, bio) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    username,
                    email,
                    hash,
                    location,
                    dob,
                    firstName,
                    lastName,
                    gender,
                    bio
                ]
            )
            .then(
                rows => {
                    for (let t = 0; t < languages.length; ++t) {
                        connection.query(
                            "INSERT INTO user_language(username, language) VALUES(?, ?)",
                            [username, languages[t]]
                        );
                    }
                    sendMailWithEmail(email);
                    return res.status(201).json({
                        success: true,
                        message: "Check your mail for an activation link"
                    });
                },
                err => {
                    if (err.errno === 1062) {
                        let exists = new Error("user exists");
                        exists.status = 409;
                        next(exists);
                    } else next(new Error(err));
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
        .query("select * from user where username = ?", [username, password])
        .then(
            rows => {
                if (rows[0]) {
                    if (!rows[0].active) {
                        return res.status(403).json({
                            success: false,
                            message: "Account not verified"
                        });
                    }
                    const match = bcrypt.compareSync(
                        password,
                        rows[0].password
                    );
                    if (!match) {
                        return res.status(403).json({
                            success: false,
                            message: "Password incorrect"
                        });
                    }

                    const {
                        firstName,
                        lastName,
                        email,
                        location,
                        dob,
                        gender,
                        active
                    } = rows[0];
                    const userPayload = {
                        username,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        location: location,
                        dob: dob,
                        gender: gender,
                        active: active
                    };
                    const token = jwt.sign(userPayload, "secret", {
                        expiresIn: "3d"
                    });

                    connection
                        .query(
                            "update user set status = 'online' where username = ? and password = ?",
                            [username, password]
                        )
                        .then(
                            row2 => {
                                // req.io.emit("online", "asdasd");
                                return res.status(200).json({
                                    success: true,
                                    message: "Logged-In successfully",
                                    token
                                });
                            },
                            err2 => {
                                console.log(err2);
                                next(err2);
                            }
                        );
                } else {
                    next(new Error("incorrect credentials"));
                }
            },
            err => {
                next(new Error(err));
            }
        );
});

router.get("/verifyUser/:id", (req, res, next) => {
    const { connection } = req;
    const { id } = req.params;
    const decrypted = decryptBuffer(id, "mano1234");

    connection
        .query("update user set active = true where email = ?", decrypted)
        .then(
            rows => {
                res.status(201).json({
                    success: true,
                    message: "Account verified, you can now login."
                });
            },
            err => {
                next(err);
            }
        );
});

router.post("/resendMail", (req, res, next) => {
    try {
        console.log(req.body);
        const { email } = req.body;
        sendMailWithEmail(email);

        return res.status(200).json({
            success: true,
            message: "Check your mail for an activation link"
        });
    } catch (err) {
        next(err);
    }
});

router.post("/logout", async (req, res) => {
    const { connection } = req;
    const { username } = req.body;
    connection.query(
        "update user set status = 'offline' where username = ?",
        [username],
        row2 => {
            return res.status(200).json({
                success: true,
                message: "Logged-Out successfully",
                token
            });
        },
        err2 => {
            next(err);
        }
    );
});

module.exports = router;
