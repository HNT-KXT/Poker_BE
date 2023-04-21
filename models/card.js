const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String, require: true, trim: true
    }
  }
);

const Card = mongoose.model('Card', schema);

module.exports = Card