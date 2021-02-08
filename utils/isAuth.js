const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        jwt.verify(token, "secret", (err, user) => {
            if (user) {
                if (user.active === false)
                    return res
                        .status(401)
                        .json({
                            success: false,
                            message: "Account not activated"
                        });
                req.user = user;
                next();
            } else {
                return res
                    .status(403)
                    .json({ success: false, message: "Not authorized" });
            }
        });
    }
};

module.exports = isAuth;
