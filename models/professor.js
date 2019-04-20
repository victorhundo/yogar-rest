var util = require('util');
var db = require('../modules/db');

var _insert = function(primeiroNome, ultimoNome, rua, cidade,estado, cep, email, uuid, username,senha){
  db.escapeArgs(arguments);
  var query = util.format(
  'INSERT INTO professor (primeiroNome, ultimoNome, rua, cidade, \
                      estado, cep,email,uuid, username,senha)\
   VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);',
    primeiroNome, ultimoNome, rua, cidade, estado, cep, email, uuid, username,senha);
  return db.mysqlExec(query);
}

var _delete = function(id){
  id = db.escape(id);
  var query = util.format(
  'DELETE FROM `professor` WHERE `uuid` = %s ;', id);
  return db.mysqlExec(query);
}

var _find = function(id){
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT primeiroNome, ultimoNome, rua, \
                             cidade, estado, cep,email,uuid, username \
                             FROM `professor` WHERE `uuid` = %s;', id);
  } else
    var query = util.format('SELECT * FROM `professor`;');
  return db.mysqlExec(query);
}

var _update = function(id, campo, valor) {
  id = db.escape(id);
  campo = db.escapeId(campo);
  valor = db.escape(valor);

  var query = util.format('UPDATE `professor` SET %s = %s WHERE `uuid` = %s',
                           campo, valor, id);
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  insert:_insert,
  delete:_delete,
  update: _update
}
