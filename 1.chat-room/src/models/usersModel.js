require("../mongodb/connection");
const mongoose = require("mongoose");
const muv = require("mongoose-unique-validator");

const googleUserSchema = new mongoose.Schema({
    googleId: { type: String, index: true, unique: true },
    name: { type: String },
    creationDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now }
});

googleUserSchema.plugin(muv);

const User = mongoose.model("googleUsers", googleUserSchema);

module.exports = User;