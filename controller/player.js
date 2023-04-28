const { Player, PlayerDTO } = require('../models/player');

class PlayerController {
  createPlayer = async (data, socket) => {
    try {
      console.log({
        userId: socket.id,
        name: data
      })
      const player = await Player.create({
        userId: socket.id,
        name: data
      });

      if (!player) socket.emit('errorCreatePlayer', 'Cannot create temporary player account!');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PlayerController;