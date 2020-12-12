const router = require("express").Router();

router.post("/initiateChat", (req, res, next) => {
    const { user1, user2 } = req.body;
    try {
        const connection = req.connection;
        connection.query(
            "INSERT INTO chat(user1, user2) VALUES(?, ?)",
            [user1, user2],
            (err, rows) => {
                if (err) throw err;
                res.send(rows);
            }
        );
    } catch (er) {
        next(er);
    }
});

module.exports = router;
