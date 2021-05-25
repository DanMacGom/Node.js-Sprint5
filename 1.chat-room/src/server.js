require("dotenv").config();

const app = require("./app");

const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);
const cookie = require("cookie");

const chatroomController = require("./controllers/chatroomsController");

io.on(
    "connection", async (socket) => {
        const username = cookie.parse(socket.handshake.headers.cookie)["session-cookie"];
        const chatroomId = socket.handshake.headers.referer.split("/").pop().replace("?", "");

        const data = await chatroomController.getChatroomData(chatroomId);

        // Show past messages.
        for (const message of data[0].messages) {
            socket.emit("chat message", `${message.username}: ${message.content} (${new Date(message.messageSentDate).toISOString()})`);
        }

        socket.join(chatroomId);

        socket.on(
            "chat message", (msg) => {
                io.to(chatroomId).emit("chat message", `${username}: ${msg}`);

                chatroomController.postMessage(chatroomId, username, msg);
            }
        );
    }
);

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

server.listen(port, () => {
    console.log(`Socket.IO server running at http://${host}:${port}/`);
});
