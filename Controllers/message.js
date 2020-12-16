const router = require("express").Router();
const isAuth = require("../utils/isAuth");

router.get("/connections", isAuth, (req, res) => {
    const { username } = req.user;

    const { connection } = req;
    connection.query(
        "select * from chat where user1 = ? or user2 = ?",
        [username, username]).then(rows => {
            if (rows[0]) {
                console.log(rows[0]);
            }
            res.json({ success: true, friends: rows });
    }, err => {
        next(err);
    });
});

router.post("/history", isAuth, (req, res, next) => {
    try {
        const { from, to } = req.body.data;
        let user1 = from,
            user2 = to;
        console.log(user1, user2);
        if (user1.localeCompare(user2) === 1) [user1, user2] = [user2, user1];

        const { connection } = req;
        connection.query(
            "select message, sentBy, sent from message m inner join chat c on (m.sentBy = ? or m.sentBy = ?) and (c.chatId = m.chatId) where c.user1=? and c.user2=?",
            [from, to, user1, user2]).then(rows => {
                return res.json({ success: true, messages: [rows] });
            }, err => {
                next(err);
            });
    } catch (er) {
        next(er);
    }
});

router.post("/createChat", isAuth, (req, res, next) => {
    let { user1, user2 } = req.body;
    try {
        const connection = req.connection;
        if (user1.localeCompare(user2) === 1) [user1, user2] = [user2, user1];
        connection.query(
            "INSERT INTO chat(user1, user2) VALUES(?, ?)",
            [user1, user2]).then(rows => {
                return res.status(201).send("Chat initiated");
            }, err => {
                next(err);
            });
    } catch (er) {
        next(er);
    }
});

module.exports = router;
