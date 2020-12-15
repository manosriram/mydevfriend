const router = require("express").Router();
const isAuth = require("../utils/isAuth");

router.put("/profile", isAuth, (req, res, next) => {
    const connection = req.connection;
    const {
        firstName,
        lastName,
        location,
        username,
        email,
        gender
    } = req.body.data;

    try {
        const connection = req.connection;

        connection
            .query(
                "UPDATE user set firstName = ?, lastName = ?, location = ?, username = ?, gender = ? where email = ?",
                [firstName, lastName, location, username, gender, email]
            )
            .then(
                rows => {
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
                    return res.json({
                        success: true,
                        message: "Profile updated successfully"
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
