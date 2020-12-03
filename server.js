const express = require("express");
const app = express();
const PORT = process.env.PORT || 5454;
const helmet = require("helmet");
const morgan = require("morgan");
const bodyparser = require("body-parser");

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.send("Hi from /");
});

app.listen(PORT, () => console.log(`Server at ${PORT}`));
