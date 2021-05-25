const User = require("../models/usersModel");

// Sign up.
function createUserMiddleware(req, res, next) {
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
                    req.data = { username: data.username };
                    next();
                }
            }
        );
    }
}

// Delete.
async function deleteUser(req, res) {
    const checkUser = await User.findOne(
        { _id: req.params.userId }
    ).exec();

    if (checkUser) {
        User.deleteOne(
            { _id: req.params.userId },
            (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: "There was a problem with your query."
                    });
                } else {
                    res.status(200).send(data);
                }
            }
        );
    } else {
        res.status(404).send({
            message: `User ${req.params.userId} does not exist.`
        });
    }
}

// Login.
function validateUserMiddleware(req, res, next) {
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

// Read.
function getAllUsers(req, res) {
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
}

module.exports = {
    createUserMiddleware,
    deleteUser,
    validateUserMiddleware,
    getAllUsers
}