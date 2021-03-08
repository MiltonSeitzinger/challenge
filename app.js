var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var { PORT } = require('./config/config-server')
var router = require('./routes');
var bodyParser = require('body-parser');

require('./sockets/controllerSockets')(io);
require('./redis/controlleRedis');

app.use(express.static('public'));
app.set('views', __dirname+"/public/");
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router(app);
server.listen(PORT, () => {
  console.log('Server running in port ', PORT);
})

module.exports = server;