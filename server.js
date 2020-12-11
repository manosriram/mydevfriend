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

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "meetwith"
});
connection.connect();

app.use(cors());

const server = app.listen(PORT, () => console.log(`Server at ${PORT}`));
const io = socketio(server);
listenMessages(io);

app.use((req, res, next) => {
    req.connection = connection;
    next();
});

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/auth", require("./Controllers/auth"));
app.use("/message", require("./Controllers/messages"));

app.get("/", (req, res) => {
    return res.send("Hi from /");
});

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        success: false,
        message: err.message
    });
});
