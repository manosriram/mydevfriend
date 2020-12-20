const listenMessages = (io, connection) => {
    io.on("connection", socket => {
        //
        socket.on("message", ({ from, to, message }) => {
            const sentBy = from;
            if (from && to) {
                if (from.localeCompare(to) === 1) to = [from, (from = to)][0];
                connection
                    .query(
                        "INSERT INTO message(chatId, message, sentBy) select chatId, ?, ? from chat c where c.user1=? and c.user2=?",
                        [message, sentBy, from, to]
                    )
                    .then(
                        rows => {
                            io.emit("message-to", { message, sentBy });
                        },
                        err => {
                            console.log(err);
                        }
                    );
            }
        });
    });
};

module.exports = listenMessages;
