const express = require("express");
const app = express();
const PORT = process.env.PORT || 5454;
const helmet = require("helmet");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const session = require("express-session");
const store = new session.MemoryStore();
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "meetwith"
});
connection.connect();

app.use((req, res, next) => {
    req.connection = connection;
    next();
});

app.use(
    session({
        secret: "secret",
        cookie: { maxAge: 1000 * 3600 },
        saveUninitialized: false,
        store
    })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/auth", require("./Controllers/auth"));

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

app.listen(PORT, () => console.log(`Server at ${PORT}`));
