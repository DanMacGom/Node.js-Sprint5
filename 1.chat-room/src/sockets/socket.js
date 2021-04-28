class Socket {
    constructor(io) {
        this.io = io;
    }

    userConnect() {
        this.io.on(
            "connection",
            (socket) => {
                console.log(`New socket connection with id: ${socket.id}`);

                socket.on(
                    "chat message",
                    msg => {
                        this.io.emit("chat message", msg);
                    }
                );

                socket.on(
                    "disconnect",
                    () => {
                        console.log(`Socket with id: ${socket.id} disconnected`); 
                    }
                );
            }
        )
    }
}

module.exports = Socket;