// class Socket {
//     constructor(io) {
//         this.io = io;
//     }

//     userConnect(req, res) {
//         this.io.on(
//             "connection", (socket) => {
//                 socket.username = req.cookies.username;

//                 socket.emit(`Welcome ${socket.username}`);
                
//                 socket.on(
//                     "chat message", (msg) => {
//                         this.io.emit("chat message", msg);
//                     }
//                 );

//                 socket.on(
//                     "disconnect", () => {
//                         console.log(`Socket with id: ${socket.id} disconnected`); 
//                     }
//                 );
//             }
//         );
//     }
// }

// module.exports = Socket;