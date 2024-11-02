//messageService.js
let io;

function initializeSocket(socketIoInstance) {
    io = socketIoInstance;
}

async function broadcastMessage(msg) {
    console.log(`Broadcasting message: ${msg}`);
    if (io) {
        io.emit('kafka message', msg);
    }
}

module.exports = {
    initializeSocket,
    broadcastMessage,
};
