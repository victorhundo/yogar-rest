var util = require('util');
var db = require('../modules/db');

var _insert = function(uuid, uuidProfessor, uuidAluno,idLicao,data,msg,remetente){
  argsEscaped = db.escapeArgs(arguments);
  var query = util.format(
    'INSERT INTO chat (\
      uuid, uuidProfessor, uuidAluno, idLicao, data, msg, remetente)\
    VALUES (%s,%s, %s, %s, %s,%s,%s);',
    uuid, uuidProfessor, uuidAluno,idLicao,data,msg,remetente);
    return db.mysqlExec(query);
}

var _find = function(id){
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `chat` WHERE `uuid` = %s;', id);
  } else
    var query = util.format('SELECT * FROM `chat`;');
  return db.mysqlExec(query);
}


module.exports = {
  find:_find,
  insert:_insert,
}
