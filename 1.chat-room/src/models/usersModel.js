require("../mongodb/connection");
const mongoose = require("mongoose");
const muv = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    username: { type: String, index: true, unique: true },
    password: { type: String },
    creationDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now }
});

userSchema.plugin(muv);

const User = mongoose.model("Users", userSchema);

module.exports = User;