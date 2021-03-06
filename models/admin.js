var util = require('util');
var db = require('../modules/db');

var _findLogin = function(username){
    username = db.escape(username);
    var query = util.format('SELECT username, uuid, senha \
                             FROM `admin` WHERE `username` = %s;', username);
  return db.mysqlExec(query);
}

var _insert = function(uuid, email, login,senha){
  argsEscaped = db.escapeArgs(arguments);
  var query = util.format(
    'INSERT INTO admin (\
      uuid, email,\
      username, senha)\
    VALUES (%s, %s, %s, %s);',
    uuid, email, login.username, login.senha);
    return db.mysqlExec(query);
}

var _delete = function(id){
  id = db.escape(id);
  var query = util.format(
  'DELETE FROM `admin` WHERE `uuid` = %s ;', id);
  return db.mysqlExec(query);
}

var _find = function(id){
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT email,uuid, username \
                             FROM `admin` WHERE `uuid` = %s;', id);
  } else
    var query = util.format('SELECT * FROM `admin`;');
  return db.mysqlExec(query);
}

var _update = function(id, campo, valor) {
  id = db.escape(id);
  campo = db.escapeId(campo);
  valor = db.escape(valor);

  var query = util.format('UPDATE `admin` SET %s = %s WHERE `uuid` = %s',
                           campo, valor, id);
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  findLogin:_findLogin,
  insert:_insert,
  delete:_delete,
  update: _update
}
