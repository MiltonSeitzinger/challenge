var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var { PORT } = require('./config/config-server')

require('./sockets/controllerSockets')(io);

app.use(express.static('public'));

server.listen(PORT, () => {
  console.log('Server running in port ', PORT);
})