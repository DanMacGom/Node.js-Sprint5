// https://stackoverflow.com/questions/61859729/using-mongodb-for-real-time-chat-database
require("../mongodb/connection");
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomName: { type: String },
    messages: [
        {
            username: { type: String },
            content: { type: String },
            messageSentDate : { type: Date, default: Date.now }
        }
    ]
});

const Room = mongoose.model("Chat", roomSchema);

module.exports = Room;