//Modules
const app = require('./app').app
const PORT = process.env.PORT || 3000;
var db  = require('./modules/db');

// Start the server
var server = app.listen(PORT, () => {
  console.log(`A API esta rodando na porta ${PORT}`);
  console.log('Pressione Ctrl+C por sair.');
  setInterval(function () {
      db.mysqlExec('SELECT 1');
  }, 5000);
});

var io = require('socket.io').listen(server);
io.set('origins', '*:*');

io.on('connection', function (socket) {
  console.log("a user connected")

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('sendMessage', (data) => {
    console.log(data);
    io.emit('sendMessage', data);
  })

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
