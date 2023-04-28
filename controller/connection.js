const { Player } = require('../models/player');

class ConnectionController {
  disconnect = async (socket) => {
    console.log("Client disconnected: ", socket.id);

    await Player.deleteOne({ userId:  socket.id });
  }
}

module.exports = new ConnectionController;