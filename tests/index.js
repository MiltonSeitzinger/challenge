var redisStore = require('../redis/controlleRedis');

var express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  http = require("http").Server(app),
  io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("Conectado");

  socket.on("message", function(msg) {
    console.log("Enviado");
  
    io.sockets.emit("message", msg);
  });
  socket.on('new-message', async (data) => {
      redisStore.addData(data)
      .then((store) => {
        io.emit('messages', 
        {message: store, data:data}
        );
      })
      .catch((err) => {
        console.log(err);
      })
    });
});

// Server temporal
exports.server = http.listen(port);