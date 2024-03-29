const socketio = require("socket.io");
const stringToArray = require("./utils/stringToArray");
const calculateDistance = require("./utils/calculateDistance");

const connections = [];

let io;

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on("connection", socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordenates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: stringToArray(techs)
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordenates) < 10 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
