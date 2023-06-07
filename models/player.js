const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: String, require: true, trim: true
    },
    roomId: {
      type: String
    },
    name: {
      type: String, require: true, trim: true
    },
    card: [
      {
        type: Number
      }
    ]
  }
);

const Player = mongoose.model('Player', schema);

class PlayerDTO {
  _id;
  name;
  card;

  constructor (player) {
    this._id = player._id;
    this.name = player.name;
    this.card = player.card;
  }
}

module.exports = { Player, PlayerDTO };