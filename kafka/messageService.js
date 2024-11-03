//messageService.js
let io;

function initializeSocket(socketIoInstance) {
    io = socketIoInstance;
}

async function broadcastMessage(msg) {
    console.log(`Broadcasting message: ${msg}`);
    if (io) {
        // Emit the message to all connected clients with the event name 'kafka message'.
        io.emit('kafka message', msg);
    }
}

module.exports = {
    initializeSocket,
    broadcastMessage,
};
