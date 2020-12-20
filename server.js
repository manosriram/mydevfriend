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
dotenv.config();

const mysqlConfig = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "codealone"
};
const connection = new Database(mysqlConfig);

const server = app.listen(PORT, () => console.log(`Server at ${PORT}`));
const io = socketio(server);
listenMessages(io, connection);

app.use((req, res, next) => {
    req.connection = connection;
    next();
});

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/auth", require("./Controllers/auth"));
app.use("/chat", require("./Controllers/message"));
app.use("/user", require("./Controllers/User"));
app.use("/match", require("./Controllers/Match"));

app.get("/", (req, res) => {
    return res.send("Hi from /");
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
