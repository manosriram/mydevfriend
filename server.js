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
dotenv.config();

const host =
    process.env.NODE_ENV === "production"
        ? process.env.ADDR_PROD
        : process.env.ADDR_DEV;
var socketPath;
if (process.env.NODE_ENV === "production") {
    socketPath = "/var/run/mysqld/mysqld.sock";
}

const mysqlConfig = {
    host: host,
    user: "root",
    port: 3306,
    password: "password",
    database: "foundbug",
    socketPath: socketPath
};
const connection = new Database(mysqlConfig);
app.use((req, res, next) => {
    req.connection = connection;
    next();
});

const server = app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server at ${PORT}`)
);
const io = socketio(server);
listenMessages(io, connection);

app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/auth", require("./Controllers/Auth"));
app.use("/chat", require("./Controllers/message"));
app.use("/user", require("./Controllers/User"));
app.use("/match", require("./Controllers/Match"));

app.get("/*", (req, res) => {
    return res.sendFile(
        path.join(__dirname, "client/build/index.html"),
        err => {
            res.status(500).send(err);
        }
    );
});

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

module.exports = app;
