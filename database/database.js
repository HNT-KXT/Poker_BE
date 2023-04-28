require('dotenv').config();
const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@project1.tz3goqw.mongodb.net/poker`;

async function connect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(url);
    console.log('Connect database successfully!');
  } catch (err) {
    console.log('Failed to connect database: ', err);
  }
}

module.exports = { connect };