const { Player, PlayerDTO } = require('../models/player');
const Room = require('../models/room');

class ConnectAndCreateController {  
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

  makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  createRoom = async (data, socket) => {
    try {
      const room = await Room.create({
        roomId: this.makeid(3),
        members: [socket.id],
        owner: socket.id,
        type: 1,
        name: data
      });

      console.log(room)
      // Notify error to client if database cannot create room
      if (!room) socket.emit('errorCreateRoom', 'Cannot create Room!');
      else {
        // update room Id for player
        const user = await Player.findOneAndUpdate(
          { userId: socket.id },
          { roomId: room.roomId }
        );

        // if cannot update, notify error to client and delete room
        if(!user) { 
          socket.emit('errorCreateRoom', 'Cannot create Room!');
          console.log('Cannot create room!');
          await Room.deleteOne({ roomId: room.roomId });
        } else {
          // send roomId to client and add client Socket to socket room
          socket.emit('getRoomId', room.roomId);
          socket.join(room.roomId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  joinRoom = async (data, socket) => {
    try {
      // Find Room
      const room = await Room.findOne({ roomId: data });
      if (!room) {
        socket.emit('errorJoinRoom', 'Cannot find room!');
        console.log('Cannot find room!');
        return;
      }
      // Get this player
      const player = await Player.findOneAndUpdate(
        { userId: socket.id },
        { roomId: data }
      );
      if (!player) {
        socket.emit('errorJoinRoom', 'Cannot join room!');
        console.log('Cannot join room!');
        return;
      }

      const roomMember = room.members;
      roomMember.push(socket.id);
      const updateRoom = await Room.findOneAndUpdate(
        { roomId: data },
        { members: roomMember }
      );
      if (!updateRoom) {
        socket.emit('errorJoinRoom', 'Cannot join room!');
        console.log('Cannot join room!');
        return;
      }
      console.log('success');
      socket.emit('joinSuccess', 'Success');
    } catch (error) {
      console.log(error);
    }
  }

  exitRoom = async (socket) => {
    try {
      // Get this player
      const player = await Player.findOne({ userId: socket.id });
      if (!player?.roomId) {
        console.log('bum bum');
        return;
      }
      // Get player's room
      const room = await Room.findOne({ roomId: player.roomId });

      if (room.members.length === 1) {
        // delete room if room has a member
        await Room.deleteOne({ roomId: player.roomId });
      } else {
        const roomMembers = room.members;
        const index = roomMembers.indexOf(socket.id);
        if (index > -1) { roomMembers.splice(index, 1); }
        await Room.findOneAndUpdate(
          { roomId: player.roomId },
          { members: roomMembers }
        )
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  disconnect = async (socket) => {
    console.log("Client disconnected: ", socket.id);

    this.exitRoom(socket);
    await Player.deleteMany({ userId:  socket.id });
  }
}

module.exports = new ConnectAndCreateController;