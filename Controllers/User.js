const router = require("express").Router();
const isAuth = require("../utils/isAuth");
const jwt = require("jsonwebtoken");

router.get("/latest", async (req, res) => {
    const { connection } = req;
    connection.query(
        "SELECT username, created from user ORDER BY created DESC LIMIT 5",
        (err, rows) => {
            return res.status(200).json({ success: true, latestUsers: rows });
        }
    );
});

router.get("/:username", (req, res, next) => {
    const { username } = req.params;
    const { connection } = req;

    connection
        .query(
            "select username, firstName, lastName, email, location, dob, gender, created, bio from user where username = ?",
            username
        )
        .then(
            row1 => {
                connection
                    .query(
                        "select language from user_language where username = ?",
                        username
                    )
                    .then(
                        row2 => {
                            return res.status(200).json({
                                success: true,
                                user: row1[0],
                                languages: row2
                            });
                        },
                        err1 => {
                            next(err1);
                        }
                    );
            },
            err2 => {
                next(err2);
            }
        );
});

router.post("/all", (req, res, next) => {
    const { connection } = req;
    const { currentPage } = req.body;

    connection
        .query("select username, created from user", [
            // limit ?, ? here
            // currentPage * 10,
            // currentPage * 10 + 10
        ])
        .then(
            rows => {
                connection
                    .query("SELECT username, language from user_language")
                    .then(
                        rows2 => {
                            console.log(rows2);
                            return res.status(200).json({
                                success: true,
                                users: rows,
                                user_languages: rows2
                            });
                        },
                        err => {
                            console.log(err);
                        }
                    );
            },
            err => {
                next(err);
            }
        );
});

router.put("/profile", isAuth, (req, res, next) => {
    const connection = req.connection;
    const {
        firstName,
        lastName,
        location,
        username,
        email,
        gender,
        bio
    } = req.body.data;

    try {
        const connection = req.connection;

        connection
            .query(
                "UPDATE user set firstName = ?, lastName = ?, location = ?, username = ?, gender = ?, bio = ? where email = ?",
                [firstName, lastName, location, username, gender, bio, email]
            )
            .then(
                rows => {
                    console.log(rows);
                    const userPayload = {
                        firstName,
                        lastName,
                        location,
                        username,
                        gender,
                        email
                    };
                    const token = jwt.sign(userPayload, "secret", {
                        expiresIn: "1d"
                    });
                    res.cookie("jtk", token);
                    return res.status(200).json({
                        success: true,
                        message: "Profile updated successfully",
                        user: userPayload
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

module.exports = router;
