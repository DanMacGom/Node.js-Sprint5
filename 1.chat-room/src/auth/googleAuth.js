const gal = require('google-auth-library');

const client = new gal.OAuth2Client(process.env.GOOGLE_WEB_APP_CLIENT_ID);

function checkAuthenticated(req, res, next) {
    const token = req.cookies["session-token"];

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_WEB_APP_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        
        res.cookie("session-cookie", payload.name);
    }

    verify()
    .then(() => {
        next();
    })
    .catch((err) => {
        console.log(err);
        res.redirect("/");
    });
}

module.exports = {
    checkAuthenticated
};
