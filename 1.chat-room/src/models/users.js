require("../mongodb/connection");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    creationDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now }
});

const User = mongoose.model("Users", userSchema);

module.exports = User;