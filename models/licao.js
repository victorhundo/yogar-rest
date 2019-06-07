var util = require('util');
var db = require('../modules/db');
var SqlString = require('sqlstring');

var _insert = function(uuidProfessor, titulo, descricao, nivel, tag, video, ehPremium, recompensa){
  descricao = SqlString.escape(descricao);
  argsEscaped = db.escapeArgs(arguments);
  var query = util.format(
    'INSERT INTO licao (\
      uuidProfessor, titulo, descricao, nivel, tag, video, ehPremium, recompensa) \
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s);',
    uuidProfessor, titulo, descricao, nivel, tag, video, ehPremium, recompensa);
  return db.mysqlExec(query);
}

var _delete = function(id){
  id = db.escape(id);
  var query = util.format(
  'DELETE FROM `licao` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

var _find = function(idProfessor, id){
  db.escapeArgs(arguments);
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `licao` WHERE `id` = %s;', id);
  } else if (idProfessor){
    var query = util.format('SELECT * FROM `licao` WHERE `uuidProfessor` = %s;', idProfessor);
  } else{
    var query = util.format('SELECT * FROM `licao`');
  }
  return db.mysqlExec(query);
}


var _update = function(id, campo, valor) {
  id = db.escape(id);
  campo = db.escapeId(campo);
  valor = db.escape(valor);

  var query = util.format('UPDATE `licao` SET %s = %s WHERE `uuid` = %s',
                           campo, valor, id);
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  insert:_insert,
  delete:_delete,
  update: _update
}
