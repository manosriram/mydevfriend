const express = require("express");
const router = express.Router();
const yup = require("yup");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { encryptBuffer, decryptBuffer } = require("../utils/encdec");
const bcrypt = require("bcryptjs");
var crypto = require("crypto");

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
    const url = `Click to verify: ${process.env.URL}/api/auth/verifyUser/${id}/`;

    sendMail("Activate Account - mydevfriend", url, email);
    return;
};

const forgotEmail = (email, connection) => {
    crypto.randomBytes(28, function(err, token) {
        if (err) console.log(err);
        var token = token.toString("hex");
        const url = `Click to verify: ${process.env.REACT_URL}/forgot/${token}?email=${email}`;
        sendMail("Forgot password - mydevfriend", url, email);
        connection
            .query("update user set reset_token = ? where email = ?", [
                token,
                email
            ])
            .then(
                rows => {
                    console.log(rows);
                },
                err => {
                    console.log(err);
                }
            );
    });
    return;
};

router.post("/forgot/:token", (req, res, next) => {
    const { password } = req.body.data;
    const { token } = req.params;
    const { email } = req.query;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const { connection } = req;
    connection
        .query("select reset_token from user where email = ?", email)
        .then(
            rows => {
                if (!rows[0].reset_token) {
                    return res.status(200).json({
                        success: false,
                        message: "Link expired"
                    });
                }
                if (rows[0] && rows[0].reset_token === token) {
                    connection
                        .query(
                            "update user set password = ?, reset_token=NULL where email = ?",
                            [hash, email]
                        )
                        .then(
                            rows2 => {
                                return res.status(201).json({
                                    success: true,
                                    message: "Password successfully reset."
                                });
                            },
                            err2 => {
                                console.log(err2);
                                next(err2);
                            }
                        );
                }
            },
            err => {
                next(err);
            }
        );
});

router.post("/forgot", (req, res, next) => {
    const { email } = req.body.data;

    const { connection } = req;
    connection.query("select username from user where email = ?", email).then(
        rows => {
            if (!rows.length) {
                return res.json({
                    success: false,
                    message: "User with email not found"
                });
            } else {
                forgotEmail(email, req.connection);
                return res.json({
                    success: true,
                    message: "Confirmation Link sent to your email"
                });
            }
        },
        err => {
            next(err);
        }
    );
});

router.post("/mail", async (req, res) => {
    if (!req.body.email)
        return res
            .status(200)
            .json({ success: false, message: "email required" });

    const { connection } = req;
    connection
        .query("select active, username from user where email = ?", [
            req.body.email
        ])
        .then(rows => {
            if (rows[0] && rows[0].active === 1) {
                return res.status(200).json({
                    success: false,
                    message: "Email already confirmed"
                });
            } else {
                if (!rows[0])
                    return res.status(200).json({
                        success: false,
                        message: "User with email doesn't exist"
                    });
                sendMailWithEmail(req.body.email);
                return res
                    .status(200)
                    .json({ success: true, message: "Activation email sent" });
            }
        });
});

router.get("/forgot/:id", (req, res, next) => {
    const { connection } = req;
    const { id } = req.params;
    const decrypted = decryptBuffer(id, "mano1234");
});

router.put("/user", (req, res, next) => {
    const { connection } = req;
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    connection
        .query("update user set password = ? where email = ?", [hash, email])
        .then(
            data => {
                console.log(data);
            },
            err => {
                next(err);
            }
        );
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
                                    username: username,
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
