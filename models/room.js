const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId, ref: 'Player'
      }
    ],
    owner: {
      type: Schema.Types.ObjectId, ref: 'Player'
    }
  },
)

const Room = mongoose.model('Room', schema);

module.exports = Room;