const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];
    jwt.verify(token, "secret", (err, user) => {
        if (user) {
            req.user = user;
            next();
        } else {
            return res
                .status(403)
                .json({ success: false, message: "Not authorized" });
        }
    });
};

module.exports = isAuth;
