const testController = require('../controller/test');
const connectionController = require('../controller/connection');
const playerController = require('../controller/player');

function routeAPI(app) {
  app.get('/test', testController.test);

}

function routeSocket(socket) {
  console.log("New client connected: " + socket.id);
  // Send socket id to client
  socket.emit("getId", socket.id);
  // Create temporary player account
  socket.on('createPlayer', (data) => playerController.createPlayer(data, socket));
  
  
  socket.on("disconnect", () => connectionController.disconnect(socket));
}

module.exports = { routeAPI, routeSocket }