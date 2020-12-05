const express = require("express");
const router = express.Router();
const yup = require("yup");

// TODO:
// 1. Get body.
// 2. Validate it using YUM.
// 3. Check if username doesn't exist.
// 4. If not, create a row in user table and user_language table.

const signUpSchema = yup.object().shape({
    username: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Special characters not allowed")
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
        .matches(/^[A-Za-z ]*$/, "Special characters not allowed")
        .min(4, "Username must atleast be of length 4")
        .max(32, "Username should not exceed length 32")
        .required(),
    password: yup
        .string()
        .min(4, "Password must atleast be of length 4")
        .max(32, "Password should not exceed length 32")
        .required()
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
            dob
        } = req.body.data;
        signUpSchema.validateSync({
            username,
            password,
            email,
            location,
            firstName,
            lastName,
            dob
        });
        const connection = req.connection;

        await connection.query(
            "select * from user where username = ? or email = ?",
            [username, email],
            async (err, rows) => {
                if (rows[0]) {
                    return res.status(409).json({
                        success: false,
                        message: "User already exists"
                    });
                } else {
                    await connection.query(
                        "INSERT INTO user(username, email, password, location, dob, firstName, lastName) values(?, ?, ?, ?, ?, ?, ?)",
                        [
                            username,
                            email,
                            password,
                            location,
                            dob,
                            firstName,
                            lastName
                        ],
                        (err, resl) => {
                            if (err) throw new Error(err);
                            else {
                                return res.status(201).json({
                                    success: true,
                                    message: "User created"
                                });
                            }
                        }
                    );
                }
            }
        );

        // console.log(validSchema);
    } catch (err) {
        next(err);
    }
});

router.post("/login", (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body.data;

    if (req.session.user) {
        return res.status(200).json({
            success: true,
            message: "Logged-In successfully",
            user: req.session.user
        });
    }

    loginSchema.validateSync({ username, password });

    const connection = req.connection;
    connection.query(
        "select * from user where username = ? and password = ?",
        [username, password],
        async (err, rows) => {
            if (rows[0]) {
                req.session.authenticated = true;
                req.session.user = rows[0];
                var hour = 3600000;
                req.session.cookie.maxAge = 14 * 24 * hour; //2 weeks
                return res.status(200).json({
                    success: true,
                    message: "Logged-In successfully",
                    user: rows[0]
                });
            } else {
                return res
                    .status(403)
                    .json({ success: false, message: "User doesn't exist" });
            }
        }
    );
});

module.exports = router;
