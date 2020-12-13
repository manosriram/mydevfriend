const router = require("express").Router();

router.post("/history", (req, res) => {
    try {
        const { from, to } = req.body.data;
        let user1 = from,
            user2 = to;
        console.log(user1, user2);
        if (user1.localeCompare(user2) === 1) [user1, user2] = [user2, user1];

        const { connection } = req;
        connection.query(
            "select message from message m inner join chat c on m.sentBy = ? and c.chatId = m.chatId where c.user1=? or c.user2=?",
            [from, user1, user2],
            (err, rows) => {
                if (err) res.json({ success: false, messages: [] });
                else res.json({ success: true, messages: [rows] });
            }
        );
    } catch (er) {
        console.log(er);
    }
});

router.post("/createChat", (req, res, next) => {
    let { user1, user2 } = req.body;
    try {
        const connection = req.connection;
        if (user1.localeCompare(user2) === 1) [user1, user2] = [user2, user1];
        connection.query(
            "INSERT INTO chat(user1, user2) VALUES(?, ?)",
            [user1, user2],
            (err, rows) => {
                if (err) throw err;
                return res.send("Chat initiated");
            }
        );
    } catch (er) {
        next(er);
    }
});

module.exports = router;
