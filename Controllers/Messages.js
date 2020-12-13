const listenMessages = (io, connection) => {
    io.on("connection", socket => {
        //
        socket.on("message", ({ from, to, message }) => {
            const sentBy = from;
            if (from.localeCompare(to) === 1) to = [from, (from = to)][0];
            console.log(message);
            connection.query(
                "INSERT INTO message(chatId, message, sentBy) select chatId, ?, ? from chat c where c.user1=? and c.user2=?",
                [message, sentBy, from, to],
                (err, rows) => {
                    if (err) console.log(err);
                    else console.log(rows);
                }
            );
        });
    });
};

module.exports = listenMessages;
