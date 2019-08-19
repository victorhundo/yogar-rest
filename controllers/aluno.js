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

/*
  POST /aluno
*/
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

/*
  POST /aluno/:id/xp
*/
var _postAlunoXp = (req, res) => {
  var response = { code: undefined, msg: undefined };
  Aluno.find(req.params.id)
  .then((success) => {
    if(success.length == 1){
      var aluno = success[0];
      if ( typeof(req.body.valor) == 'number'){
        req.body.campo = "xp";
        req.body.valor += success[0].xp;
        _updateAluno(req, res);
      }
    } else{
      res.status(404).send({message: "Aluno not found."});
    }
  })
}

/*
  POST /aluno/:id/upgrade
*/
var _postAlunoUpgrade = (req, res) => {
  Aluno.find(req.params.id)
  .then((success) => {
    if(success.length == 1){
      var aluno = success[0];
      req.body.campo = "ehPremium";
      req.body.valor = true;
      _updateAluno(req, res);
    } else{
      res.status(404).send({message: "Aluno not found."});
    }
  })
}

module.exports = {
  getAlunos: _getAlunos,
  getAluno: _getAluno,
  postAluno: _postAluno,
  deleteAluno:_deleteAluno,
  updateAluno: _updateAluno,
  postAlunoXp: _postAlunoXp,
  postAlunoUpgrade: _postAlunoUpgrade
}
