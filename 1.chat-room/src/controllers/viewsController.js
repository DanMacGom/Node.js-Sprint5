const path = require("path");

function renderChat(req, res) {
    console.log(req.body);
    res.sendFile(path.resolve(__dirname, '../views/chat.html'));
}

function renderAuthentication(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/authentication.html'));
}

module.exports = {
    renderChat,
    renderAuthentication
}