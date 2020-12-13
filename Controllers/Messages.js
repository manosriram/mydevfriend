const listenMessages = (io, connection) => {
    io.on("connection", socket => {
        //
        socket.on("message", ({ from, to, message }) => {
            const sentBy = from;
            if (from.localeCompare(to) === 1) [from, to] = [to, from];
            console.log(from, to);
            connection.query(
                "INSERT INTO message(chatId, message, sentBy) select chatId, ?, ? from chat where user1=? and user2=?",
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
