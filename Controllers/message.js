const router = require("express").Router();
const isAuth = require("../utils/isAuth");

router.post("/history", isAuth, (req, res, next) => {
    try {
        const { from, to } = req.body.data;
        let user1 = from,
            user2 = to;
        console.log(user1, user2);
        if (user1.localeCompare(user2) === 1) [user1, user2] = [user2, user1];

        const { connection } = req;
        connection.query(
            "select message, sentBy from message m inner join chat c on (m.sentBy = ? or m.sentBy = ?) and (c.chatId = m.chatId) where c.user1=? and c.user2=?",
            [from, to, user1, user2]).then(rows => {
                res.json({ success: true, messages: [rows] });
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
