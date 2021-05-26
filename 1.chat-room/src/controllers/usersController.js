const User = require("../models/usersModel");

// Read.
function getAllUsers(req, res) {
    User.find(
        {}, { googleId: 1, name: 1, creationDate: 1, lastLogin: 1 },
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
    getAllUsers
}