const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../.env") });

function signJWT(req, res) {
    const authToken = jwt.sign(req.data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });

    res.status(200).send({
        token: authToken
    });
}

function verifyJWT(req, res, next) {
    const token = req.headers["authorization"];

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
            if (err) {
                return res.status(403).send({
                    message: "Token expired or malformed."
                });
            } else {
                next();
            }

        });
    } else {
        res.status(401).send({
            message: "Add your validated token to the header."
        });
    }
}

module.exports = {
    signJWT,
    verifyJWT
};