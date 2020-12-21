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
                let user1 = username,
                    user2 = rows[0].username;
                if (user1.localeCompare(user2) === 1)
                    [user1, user2] = [user2, user1];
                connection
                    .query(
                        "update chat set active = 1 where user1 = ? and user2 = ?",
                        [user1, user2]
                    )
                    .then(() => {
                        return res
                            .status(200)
                            .json({ success: true, user: rows[0].username });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            err => {
                next(new Error(err));
            }
        );
});

module.exports = router;
