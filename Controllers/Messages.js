const listenMessages = io => {
    io.on("connection", socket => {
        //
        socket.on("message", ({ from, to, message }) => {
            console.log(from, to, message);
        });
    });
};

module.exports = listenMessages;
