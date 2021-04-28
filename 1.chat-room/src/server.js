require("dotenv").config();

const app = require("./app");

const http = require('http');

const server = http.createServer(app);
const io = require("socket.io")(server);
const Socket = require('./sockets/socket');

const socket = new Socket(io);

socket.userConnect();

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;
server.listen(port, () => {
    console.log(`Socket.IO server running at http://${host}:${port}/`);
});
