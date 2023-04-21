const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String, require: true, trim: true
    },
    card: [
      {
        type: Schema.Types.ObjectId, ref: 'card', require: true
      }
    ]
  }
)