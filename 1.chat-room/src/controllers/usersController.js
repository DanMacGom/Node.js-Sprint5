const User = require("../models/users");

// Log In
function logInUser(req, res) {
    User.find(
        { username: req.body.username, password: req.body.password },
        (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            if (Array.isArray(data) && data.length === 0) {
                res.status(404).send({
                    message: "Incorrect username or password."
                });                
            } else {

                res.redirect(307, "/chatrooms");
            }
        }
    );
}

// Sign up.
function createUser(req, res) {
    User.create(
        { username: req.body.username, password: req.body.password },
        (err, data) => {
            if (err && err.code === 11000) {
                return res.status(409).send({
                    message: `A player with name ${req.body.username} already exists, try another one.`
                });
            }

            res.send(data);
        }
    );
}


module.exports = {
    createUser,
    logInUser
}
