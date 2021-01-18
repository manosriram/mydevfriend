const router = require("express").Router();
const isAuth = require("../utils/isAuth");

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

router.get("/connections", isAuth, (req, res, next) => {
    const { username } = req.user;

    const { connection } = req;
    connection
        .query(
            "select * from chat where (user1 = ? or user2 = ?) and active = 1",
            [username, username]
        )
        .then(
            rows => {
                if (rows[0]) {
                }
                res.status(200).json({ success: true, friends: rows });
            },
            err => {
                next(err);
            }
        );
});

router.post("/history", isAuth, (req, res, next) => {
    try {
        const { from, to } = req.body.data;
        console.log(req.body.data);
        let user1 = from,
            user2 = to;
        if (user1.localeCompare(user2) === 1) [user1, user2] = [user2, user1];

        const { connection } = req;
        connection
            .query(
                "select message, sentBy, sent from message m inner join chat c on (m.sentBy = ? or m.sentBy = ?) and (c.chatId = m.chatId) where c.user1=? and c.user2=?",
                [from, to, user1, user2]
            )
            .then(
                rows => {
                    return res
                        .status(200)
                        .json({ success: true, messages: [rows] });
                },
                err => {
                    next(err);
                }
            );
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
