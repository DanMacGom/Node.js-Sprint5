// const gal = require('google-auth-library');

// const client = new gal.OAuth2Client(process.env.GOOGLE_WEB_APP_CLIENT_ID);

// function checkAuthenticated(req, res, next) {
//     const token = req.cookies["session-token"];
//     let user = {};

//     async function verify() {
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: process.env.GOOGLE_WEB_APP_CLIENT_ID,
//         });

//         const payload = ticket.getPayload();
//         user.name = payload.name;
//         user.email = payload.email;
//         user.picture = payload.picture;

//         try {
//             req.user = user;
//             next();
//         } catch(err) {
//             console.log(err);
//             res.redirect("/login");
//         };
//     }

//     verify();
// }

// module.exports = {
//     checkAuthenticated
// };
