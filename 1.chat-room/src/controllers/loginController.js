function renderLogin(req, res) {
    res.render("login");
}

function getCookieMiddleware(req, res, next) {
    res.cookie("session-cookie", req.body.username);

    next();
    // res.status(200).send({
    //     message: `Cookie set.`
    // });
}

function logout(req, res) {
    res.clearCookie("session-token");
    res.redirect("/");
}

module.exports = {
    getCookieMiddleware,
    logout,
    renderLogin
}