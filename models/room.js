const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    roomId: {
      type: String, require: true, trim: true
    },
    members: [
      {
        type: String, ref: 'Player'
      }
    ],
    owner: {
      type: String, ref: 'Player'
    },
    type: {
      type: Number,
    },
    name: {
      type: String, require: true, trim: true
    }
  },
)

const Room = mongoose.model('Room', schema);

module.exports = Room;