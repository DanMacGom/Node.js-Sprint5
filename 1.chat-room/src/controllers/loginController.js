// const gal = require("google-auth-library");
// const usersController = require("../controllers/usersController");

function renderLogin(req, res) {
    res.render("login");
}

// function getCookie(req, res) {
//     res.cookie("session-cookie", req.body.username);

//     res.status(200).send({
//         message: `Cookie set.`
//     });
// }

function getToken(req, res) {
    const client = new gal.OAuth2Client(process.env.GOOGLE_WEB_APP_CLIENT_ID);

    const token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_WEB_APP_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }

    verify()
    .then(() => {
        res.cookie("session-token", token);

        res.status(200).send({
            message: "success"
        });
    })
    .catch(console.error);
}

function logout(req, res) {
    res.clearCookie("session-token");
    res.redirect("/");
}

module.exports = {
    // getCookie,
    getToken,
    logout,
    renderLogin
}