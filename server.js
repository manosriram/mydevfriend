const express = require("express");
const app = express();
const PORT = process.env.PORT || 5454;
const helmet = require("helmet");
const morgan = require("morgan");
const bodyparser = require("body-parser");
var mysql = require("mysql");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const Database = require("./Controllers/Query");
const dotenv = require("dotenv");
const path = require("path");
const redis = require("redis");
const isAuth = require("./utils/isAuth");
const util = require("util");
dotenv.config();
process.setMaxListeners(0);

const host =
    process.env.NODE_ENV === "production"
        ? process.env.ADDR_PROD
        : process.env.ADDR_DEV;
var socketPath;
if (process.env.NODE_ENV === "production") {
    socketPath = "/var/run/mysqld/mysqld.sock";
}

const client = redis.createClient();
client.get = util.promisify(client.get);

const mysqlConfig = {
    host: host,
    user: "root",
    port: 3306,
    password: "password",
    database: "mydevfriend",
    socketPath: socketPath
};
const connection = new Database(mysqlConfig);
const server = app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server at ${PORT}`)
);
const io = socketio(server, {
    path: "/socket"
});
// app.use(isAuth);
app.use((req, res, next) => {
    req.io = io;
    req.connection = connection;
    req.redis = client;
    next();
});
app.set("io", io);

io.on("connection", socket => {
    socket.on("logged", ({ username }) => {
        socket.username = username;
        const userOnline = `status:${username}`;
        client.set(userOnline, "online");
        io.emit("status-change", { username: username, status: "online" });
    });

    socket.on("_message", ({ from, to, message }) => {
        if (from && to) {
            const from1 = from,
                to1 = to;
            if (from.localeCompare(to) === 1) to = [from, (from = to)][0];
            const redisUsername = `conversation:${from}:${to}`;

            const messageMetadata = JSON.stringify({
                message,
                from: from1,
                to: to1,
                sentBy: from1,
                created_at: new Date()
            });

            client.rpush(
                [redisUsername, messageMetadata],
                (err, redisResponse) => {
                    if (err) console.log(err);
                }
            );
            io.emit("message-to", {
                message,
                from: from1,
                to: to1,
                sentBy: from1
            });
        }
    });

    socket.on("disconnect", () => {
        const userOffline = `status:${socket.username}`;
        client.set(userOffline, "offline");
        io.emit("status-change", {
            username: socket.username,
            status: "offline"
        });
    });

    socket.on("offline", username => {
        const userOffline = `status:${username.username}`;
        console.log(userOffline);
        client.set(userOffline, "offline");
    });
});
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/api/auth", require("./Controllers/Auth"));
app.use("/api/chat", require("./Controllers/message"));
app.use("/api/user", require("./Controllers/User"));
app.use("/api/match", require("./Controllers/Match"));

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    return res.json({
        success: false,
        message: err.message
    });
});

app.get("/*", (req, res) => {
    return res.sendFile(
        path.join(__dirname, "client/build/index.html"),
        err => {
            return res.status(500).send(err);
        }
    );
});

module.exports = app;

