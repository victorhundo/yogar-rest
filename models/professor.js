var util = require('util');
var db = require('../modules/db');

var _insert = function(uuid, nome, email, login, endereco){
  argsEscaped = db.escapeArgs(arguments);
  switch (argsEscaped.length) {
    case 5:
      return _insertWithEndereco(uuid, nome, email, login, endereco)
    default:
      return _insertWithOutEndereco(uuid, nome, email, login)
  }
}

var _insertWithEndereco = function(uuid, nome, email, login, endereco){
  var query = util.format(
    'INSERT INTO professor (\
      primeiroNome, ultimoNome,\
      email,uuid, \
      username,senha,\
      rua,estado,\
      cidade,cep)\
    VALUES (%s, %s, %s, %s, %s, %s,%s,%s,%s,%s);',
    nome.primeiro, nome.ultimo,
    email, uuid,
    login.username, login.senha,
    endereco.rua,endereco.estado,
    endereco.cidade,endereco.cep);
    return db.mysqlExec(query);
}

var _insertWithOutEndereco = function(uuid, nome, email, login){
  var query = util.format(
    'INSERT INTO professor (\
      primeiroNome, ultimoNome,\
      email,uuid,\
      username,senha)\
    VALUES (%s, %s, %s, %s, %s, %s);',
    nome.primeiro, nome.ultimo,
    email, uuid,
    login.username, login.senha);
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


var _findLogin = function(username){
  username = db.escape(username);
  var query = util.format('SELECT primeiroNome, ultimoNome, rua, \
                           cidade, estado, cep,email,uuid, username, senha \
                           FROM `professor` WHERE `username` = %s;', username);
  return db.mysqlExec(query);
}

var _update = function(uuid, campo, valor) {
  uuid = db.escape(uuid);
  campo = db.escapeId(campo);
  valor = db.escape(valor);

  var query = util.format('UPDATE `professor` SET %s = %s WHERE `uuid` = %s',
                           campo, valor, uuid);

  console.log(query)
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  findLogin:_findLogin,
  insert:_insert,
  delete:_delete,
  update: _update
}
