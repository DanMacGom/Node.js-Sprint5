function renderLogin(req, res) {
    res.render("login");
}

function getCookieMiddleware(req, res, next) {
    res.cookie("session-cookie", req.body.username);

    next();
}

function logout(req, res, next) {
    res.clearCookie("session-cookie");
    res.redirect("/");
}

module.exports = {
    getCookieMiddleware,
    logout,
    renderLogin
}