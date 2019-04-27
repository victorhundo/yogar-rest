var util = require('util');
var Aluno = require('../models/aluno');
var db = require('../modules/db');
var query = require('../modules/query');
var uuidv1 = require('uuid/v1');

/*
  GET /aluno
*/
var _getAlunos = (req, res) => {
  Aluno.find()
  .then((sucess) => {
    var alunos = sucess;
    alunos = alunos.filter(query.search(req.query));
    res.status(200).send(alunos);
  });
}

/*
  GET /aluno/:id
*/
var _getAluno = (req, res) => {
  Aluno.find(req.params.id)
  .then((sucess) => {
      var aluno = sucess;
      res.status(200).send(aluno);
  });
}

var _postAluno = (req, res) => {
  var uuid = uuidv1(); // Generate UUID
  Aluno.find(uuid)
  .then((sucess) => {
    if(sucess.length == 0){
      return Aluno.insert(
        uuid,
        req.body.nome,
        req.body.email,
        req.body.login,
        req.body.endereco
      )
    } else{
      _postAluno(req,res);
    }
  })
  .then(
    (success) => { res.status(201).send({"insertId":uuid});},
    (error) => { res.status(500).send("Internal Server Error");}
  );
}

/*
  DELETE /aluno
*/
var _deleteAluno = (req, res) => {
  Aluno.delete(req.params.id)
  .then((sucess) => {
    return Aluno.find(req.params.id)
  })
  .then((sucess) => {
    if(sucess.length <= 0)
      res.status(200).send({message: 'Ok'});
    else
      res.status(500).send({message: 'Internal Error'});
  });
}

/*
  UPDATE /aluno
*/
var _updateAluno = (req, res) => {
  if (req.body.campo == 'id')
    res.status(403).send({message: "você não pode atualizar o ID"})
  Aluno.update(req.params.id, req.body.campo, req.body.valor)
  .then((sucess) => {
      if (sucess) {
        res.status(200).send({message: "Atualização feita com sucesso"});
      } else {
        res.status(500).send({message: "Erro no servidor"});
      }
  });
}

module.exports = {
  getAlunos: _getAlunos,
  getAluno: _getAluno,
  postAluno: _postAluno,
  deleteAluno:_deleteAluno,
  updateAluno: _updateAluno
}
