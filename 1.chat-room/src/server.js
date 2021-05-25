require("dotenv").config();

const app = require("./app");

const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);
const cookie = require("cookie");

const Chatroom = require("./models/chatroomsModel");

io.on(
    "connection", async (socket) => {
        const username = cookie.parse(socket.handshake.headers.cookie)["session-cookie"];
        const chatroomId = socket.handshake.headers.referer.split("/").pop().replace("?", "");

        const data = await Chatroom.find(
            { _id: chatroomId },
            { messages: 1, _id: 1 }
        ).exec();

        for (const message of data[0].messages) {
            socket.emit("chat message", `${message.username}: ${message.content} (${new Date(message.messageSentDate).toISOString()})`);
        }

        socket.join(chatroomId);

        socket.on(
            "chat message", (msg) => {
                io.to(chatroomId).emit("chat message", `${username}: ${msg}`);
                
                Chatroom.updateOne(
                    { _id: chatroomId },
                    { 
                        $push: {
                            messages: { 
                                username: username,
                                content: msg
                            }
                        }
                    },
                    (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(msg);
                        }
                    }
                );
            }
        );



        // socket.on(
        //     "connect", () => {
        //         io.emit("onConnect", `${username} connected.`)
        //     }
        // );

        // socket.on(
        //     "disconnect", () => {
        //         io.emit("onDisconnect", `${username} disconnected.`)
        //     }
        // );
    }
);

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

server.listen(port, () => {
    console.log(`Socket.IO server running at http://${host}:${port}/`);
});
