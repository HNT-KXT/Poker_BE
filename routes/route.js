const testController = require('../controller/test');
const ConnectAndCreateController = require('../controller/ConnectAndCreate');

function routeAPI(app) {
  app.get('/test', testController.test);

}

function routeSocket(socket, socketIo) {
  console.log("New client connected: " + socket.id);
  // Send socket id to client
  socket.emit("getId", socket.id);
  // Create temporary player account
  socket.on('createPlayer', (data) => ConnectAndCreateController.createPlayer(data, socket));
  
  socket.on('createRoom', (data) => ConnectAndCreateController.createRoom(data, socket));

  // socket.on('joinRoom', () => {
  //   socket.join('abcroom');
  //   socketIo.to('abcroom').emit('roomSend', 'okok');
  // })

  socket.on('joinRoom', (data) => ConnectAndCreateController.joinRoom(data, socket));
  
  socket.on("disconnect", () => ConnectAndCreateController.disconnect(socket));
}

module.exports = { routeAPI, routeSocket }