var util = require('util');
var db = require('../modules/db');

var _insert = function(uuid, uuidProfessor, uuidAluno,idLicao,data,msg,remetente, alunoNome, licaoTitulo){
  argsEscaped = db.escapeArgs(arguments);
  msg = db.escape(msg);
  var query = util.format(
    'INSERT INTO chat (\
      uuid, uuidProfessor, uuidAluno, idLicao, data, msg, remetente, alunoNome, licaoTitulo)\
    VALUES (%s,%s, %s, %s, %s,%s,%s, %s, %s);',
    uuid, uuidProfessor, uuidAluno,idLicao,data,msg,remetente, alunoNome,licaoTitulo);
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

var _findProfessor = function(id){
  id = db.escape(id);
  var query = util.format('SELECT * FROM `chat` WHERE `uuidProfessor` = %s;', id);
  return db.mysqlExec(query);
}

var _findAlunos = function(id){
  id = db.escape(id);
  var query = util.format('SELECT DISTINCT uuidAluno, alunoNome from `chat` where `uuidProfessor`= %s', id);
  return db.mysqlExec(query);
}

var _findChatsByAluno = function(id, idAluno){
  id = db.escape(id);
  idAluno = db.escape(idAluno);
  var query = util.format('SELECT DISTINCT uuid,licaoTitulo from `chat` where `uuidProfessor`=%s and `uuidAluno`=%s', id,idAluno);
  return db.mysqlExec(query);
}




module.exports = {
  find:_find,
  insert:_insert,
  findProfessor:_findProfessor,
  findAlunos:_findAlunos,
  findChatsByAluno:_findChatsByAluno,
}
