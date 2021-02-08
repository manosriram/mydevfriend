const listenMessages = (req, io, connection) => {
    io.on("connection", socket => {
        req.connected = true;
        socket.on("_message", ({ from, to, message }) => {
            const sentBy = from;
            console.log("hit");
            if (from && to) {
                if (from.localeCompare(to) === 1) to = [from, (from = to)][0];
                const redisUsername = from + to;

                const messageMetadata = {
                    message,
                    sentBy,
                    from,
                    to
                };

                req.client.lrange(redisUsername, 0, -1, (err, data) => {
                    if (err) throw err;

                    req.client.rpush(
                        redisUsername,
                        JSON.stringify(messageMetadata),
                        (err, insertedData) => {
                            if (err) throw err;
                        }
                    );

                    // req.client.set(redisUsername, redisData);
                });

                // connection
                // .query(
                // "INSERT INTO message(chatId, message, sentBy) select chatId, ?, ? from chat c where c.user1=? and c.user2=?",
                // [message, sentBy, from, to]
                // )
                // .then(
                // rows => {
                // io.emit("message-to", { message, sentBy });
                // const now = new Date()
                // .toISOString()
                // .slice(0, 19)
                // .replace("T", " ");
                // connection
                // .query(
                // "UPDATE chat set last_message_at = ? where user1 = ? and user2 = ?",
                // [now, from, to]
                // )
                // .then(() => {});
                // },
                // err => {
                // console.log(err);
                // }
                // );
            }
        });

        socket.on("disconnect", () => {
            if (req.connected === true) {
                // req.client.get("a", (err, data) => {
                // console.log(data);
                // });
                req.connected = false;

                socket.removeAllListeners();
            }
        });
    });
};

module.exports = listenMessages;
