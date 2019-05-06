var util = require('util');
var db = require('../modules/db');

var _insert = function(titulo, texto, uuidProfessor, datetime){
  argsEscaped = db.escapeArgs(arguments);
  var query = util.format(
    'INSERT INTO post (\
      titulo, texto,\
      uuidProfessor,data) \
    VALUES (%s, %s, %s, %s);',
    titulo, texto,
    uuidProfessor, datetime);
  return db.mysqlExec(query);
}

var _delete = function(id){
  id = db.escape(id);
  var query = util.format(
  'DELETE FROM `post` WHERE `uuid` = %s ;', id);
  return db.mysqlExec(query);
}

var _find = function(id){
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `post` WHERE `id` = %s;', id);
  } else
    var query = util.format('SELECT * FROM `post`;');
  return db.mysqlExec(query);
}


var _update = function(id, campo, valor) {
  id = db.escape(id);
  campo = db.escapeId(campo);
  valor = db.escape(valor);

  var query = util.format('UPDATE `post` SET %s = %s WHERE `uuid` = %s',
                           campo, valor, id);
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  insert:_insert,
  delete:_delete,
  update: _update
}
