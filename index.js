const express = require("express");
require('dotenv').config();
const { routeAPI, routeSocket } = require('./routes/route');

const db = require('./database/database');

const app = express();
const PORT = process.env.PORT;

db.connect();

app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(express.json());  // for parsing application/json

// Allow access API
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Authorization,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
routeAPI(app);

// initialize socket
const server = require('http').Server(app);
// Allow access socket
const socketIo = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});
// Client connect to server
socketIo.on("connection", (socket) => {
  routeSocket(socket);
});

server.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}!`);
});