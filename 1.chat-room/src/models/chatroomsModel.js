require("../mongodb/connection");
const mongoose = require("mongoose");
const muv = require("mongoose-unique-validator");

const chatroomSchema = new mongoose.Schema({
    chatroomName: { type: String, index:true, unique: true },
    messages: [
        {
            username: { type: String },
            content: { type: String },
            messageSentDate : { type: Date, default: Date.now }
        }
    ],
    createdBy: { type: String },
    dateCreated: { type: Date, default: Date.now }
});

chatroomSchema.plugin(muv);

const Chatroom = mongoose.model("Chat", chatroomSchema);

module.exports = Chatroom;