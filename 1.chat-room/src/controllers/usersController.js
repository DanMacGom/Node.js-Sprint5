const User = require("../models/usersModel");

// Sign up.
function createUser(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Specify a username and a password."
        });
    } else {
        User.create(
            { username: req.body.username, password: req.body.password },
            (err, data) => {
                if (err && err.name === "ValidationError") {
                    res.status(409).send({
                        message: `A player with name ${req.body.username} already exists, try another one.`
                    });
                } else if (err) {
                    res.status(500).send({
                        message: "There was an error with your query."
                    });
                } else {
                    console.log(`User ${data.username} created.`)
                    req.data = { username: data.username };
                    next();
                }
            }
        );
    }
}

function deleteUser(req, res) {
    if (!req.body.username) {
        res.status(400).send({
            message: " Specify a username."
        })
    } else {
        User.deleteOne(
            { username: req.body.username },
            (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: "There was a problem with your query."
                    });
                } else {
                    res.status(200).send(data)
                }
            }
        )
    }
}

// Login.
function validateUser(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Specify a username and a password."
        });
    } else {
        User.findOne(
            { username: req.body.username, password: req.body.password },
            (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        message: "There was an error with your query."
                    });
                } else if (!data) {
                    res.status(404).send({
                        message: "Incorrect username or password."
                    });
                } else {
                    req.username = { username: data.username };
                    next();
                }
            }
        );
    }
}

function getAllUsers(req, res, next) {
    User.find(
        {}, { username: 1, creationDate: 1, lastLogin: 1 },
        (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: "There was an error with your query."
                })
            } else {
                res.status(200).send(data);
            }
        }
    );

    next();
}

module.exports = {
    createUser,
    deleteUser,
    validateUser,
    getAllUsers
}