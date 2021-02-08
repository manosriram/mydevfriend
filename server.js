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
const listenMessages = require("./Controllers/Messages");
const Database = require("./Controllers/Query");
const dotenv = require("dotenv");
const path = require("path");
const redis = require("redis");
const isAuth = require("./utils/isAuth");
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
app.use(isAuth);
app.use((req, res, next) => {
    req.io = io;
    req.connection = connection;
    req.client = client;
    listenMessages(req, io, connection);
    next();
});
app.set("io", io);

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
