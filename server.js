//Modules
const app = require('./app').app
const PORT = process.env.PORT || 3000;
var db  = require('./modules/db');
var chat = require('./controllers/chat');


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

  socket.on('subscribe', function(room) {
    console.log('joining room', room);
    socket.join(room);
  });

  socket.on('sendMessage', (data) => {
    console.log(data);
    chat.postChat(data);
    io.in(data.room).emit('sendMessage', data);
  })

});
