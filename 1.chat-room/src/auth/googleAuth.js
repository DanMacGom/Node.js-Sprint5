const gal = require('google-auth-library');
const client = require("../auth/client");

function checkAuthenticated(req, res, next) {
    const token = req.cookies["session-token"];
    let user = {};

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_WEB_APP_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;

        try {
            req.user = user;
            next();
        } catch(err) {
            console.log(err);
            res.redirect("/login");
        };
    }

    verify();
    // .then(() => {
    //     req.user = user;
    //     next();
    // })
    // .catch((err) => {
    //     console.log(err);
    //     res.redirect("/login");
    // });
}

module.exports = {
    checkAuthenticated
};
