function renderLogin(req, res) {
    res.render("login");
}

function getCookie(req, res) {
    res.cookie("session-cookie", req.body.username);

    res.status(200).send({
        message: `Cookie set.`
    });
}

function logout(req, res) {
    res.clearCookie("session-token");
    res.redirect("/");
}

module.exports = {
    getCookie,
    logout,
    renderLogin
}