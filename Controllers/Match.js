const router = require("express").Router();
const isAuth = require("../utils/isAuth");

router.get("/", isAuth, (req, res, next) => {
    const { connection } = req;
    const { username } = req.user;
    connection
        .query(
            "select username from user where username != ? order by rand() limit 1",
            [username]
        )
        .then(
            rows => {
                return res
                    .status(200)
                    .json({ success: true, user: rows[0].username });
            },
            err => {
                next(new Error(err));
            }
        );
});

module.exports = router;
