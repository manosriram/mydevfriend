function checkAuth(req, res, next) {
    let token = req.headers["authorization"];
    jwt.verify(token, "secret", (err, user) => {
        if (user) {
            req.user = user;
            next();
        } else
            return res
                .status(403)
                .json({ success: false, message: "Login to continue" });
    });
}

module.exports = checkAuth;
