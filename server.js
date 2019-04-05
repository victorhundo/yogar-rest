//Modules
const app = require('./app').app
const PORT = process.env.PORT || 3000;
var db  = require('./modules/db');


// Start the server
app.listen(PORT, () => {
  console.log(`A API esta rodando na porta ${PORT}`);
  console.log('Pressione Ctrl+C por sair.');
  setInterval(function () {
      db.mysqlExec('SELECT 1');
  }, 5000);
});
