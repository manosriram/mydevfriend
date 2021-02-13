const router = require("express").Router();
const isAuth = require("../utils/isAuth");

router.get("/status", isAuth, (req, res, next) => {
    const { connection } = req;

    connection.query("select username, status from user").then(
        rows => {
            res.status(200).json({ success: true, userStatus: rows });
        },
        err => {
            next(err);
        }
    );
});

router.post("/toggleChat", isAuth, (req, res, next) => {
    let { activeValue, user1, user2 } = req.body.data;
    if (user1.localeCompare(user2) === 1) [user1, user2] = [user2, user1];

    const { connection } = req;
    connection
        .query("update chat set active = ? where user1 = ? and user2 = ?", [
            activeValue,
            user1,
            user2
        ])
        .then(result => {
            console.log(result);
            return res
                .status(201)
                .json({ success: true, message: "Chat removed" });
        })
        .catch(err => {
            next(err);
        });
});

const setReadUnread = (rows, redis) => {
    const promises = rows.map(async row => {
        const redisName = `run:${row.user1}:${row.user2}`;
        const readStatus = await redis.get(redisName);
        return {
            user: row.user2,
            status: readStatus === "read" ? "read" : "unread"
        };
    });
    return Promise.all(promises);
};

router.get("/connections", isAuth, (req, res, next) => {
    const { username } = req.user;

    const { connection } = req;
    connection
        .query(
            "select * from chat where (user1 = ? or user2 = ?) and active = 1 order by last_message_at desc",
            [username, username]
        )
        .then(
            async rows => {
                const { redis } = req;
                const readUnread = await setReadUnread(rows, redis);

                res.status(200).json({
                    success: true,
                    friends: rows,
                    readUnread: readUnread
                });
            },
            err => {
                next(err);
            }
        );
});

router.post("/history", isAuth, (req, res, next) => {
    try {
        const { from, to } = req.body.data;
        const { redis } = req;
        let user1 = from,
            user2 = to;
        if (user1.localeCompare(user2) === 1) [user1, user2] = [user2, user1];
        const redisUsername = `conversation:${user1}:${user2}`;
        const readUnread = `run:${user1}:${user2}`;

        redis.set(readUnread, "read");

        redis.lrange(redisUsername, 0, -1, (err, redisResponse) => {
            let messages = [];
            redisResponse.map(message => {
                messages.push(JSON.parse(message));
            });
            return res.status(200).json({ success: true, messages });
        });
    } catch (er) {
        next(er);
    }
});

router.post("/createChat", isAuth, (req, res, next) => {
    let { user1, user2 } = req.body;
    try {
        const connection = req.connection;
        console.log(user1, user2);
        if (user1.localeCompare(user2) === 1) [user1, user2] = [user2, user1];
        const { redis } = req;
        const readUnread = `run:${user1}:${user2}`;
        redis.set(readUnread, "unread");
        connection
            .query("INSERT INTO chat(user1, user2) VALUES(?, ?)", [
                user1,
                user2
            ])
            .then(
                rows => {
                    return res.status(201).send({
                        success: true,
                        message: "Chat initiated",
                        code: 1
                    });
                },
                err => {
                    if (err.errno === 1062) {
                        connection.query(
                            "update chat set active = 1 where user1 = ? and user2 = ?",
                            [user1, user2]
                        );
                        return res.status(200).send({
                            success: true,
                            message: "Existing chat",
                            code: 0
                        });
                    }
                    next(err);
                }
            );
    } catch (err) {
        next(err);
    }
});

module.exports = router;
