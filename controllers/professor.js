var util = require('util');
var Professor = require('../models/professor');
var db = require('../modules/db');
var query = require('../modules/query');
var uuidv1 = require('uuid/v1');

/*
  GET /professor
*/
var _getProfessores = (req, res) => {
  Professor.find()
  .then((sucess) => {
    var professores = sucess;
    professores = professores.filter(query.search(req.query));
    res.status(200).send(professores);
  });
}

/*
  GET /professor/:id
*/
var _getProfessor = (req, res) => {
  Professor.find(req.params.id)
  .then((sucess) => {
      var professor = sucess;
      res.status(200).send(professor);
  });
}

var _postProfessor = (req, res) => {
  var uuid = uuidv1(); // Generate UUID
  Professor.find(uuid)
  .then((sucess) => {
    if(sucess.length == 0){
      return Professor.insert(
        req.body.nome.primeiro, req.body.nome.ultimo,
        req.body.endereco.rua, req.body.endereco.cidade,
        req.body.endereco.estado, req.body.endereco.cep,
        req.body.email,uuid,
        req.body.login.username, req.body.login.senha
      )
    } else{
      _postProfessor(req,res);
    }
  })
  .then(
    (success) => { res.status(201).send({"insertId":uuid});},
    (error) => { res.status(500).send("Internal Server Error");}
  );
}

/*
  DELETE /professor
*/
var _deleteProfessor = (req, res) => {
  Professor.delete(req.params.id)
  .then((sucess) => {
    return Professor.find(req.params.id)
  })
  .then((sucess) => {
    if(sucess.length <= 0)
      res.status(200).send({message: 'Ok'});
    else
      res.status(500).send({message: 'Internal Error'});
  });
}

/*
  UPDATE /professor
*/
var _updateProfessor = (req, res) => {
  if (req.body.campo == 'id')
    res.status(403).send({message: "você não pode atualizar o ID"})
  Professor.update(req.params.id, req.body.campo, req.body.valor)
  .then((sucess) => {
      if (sucess) {
        res.status(200).send({message: "Atualização feita com sucesso"});
      } else {
        res.status(500).send({message: "Erro no servidor"});
      }
  });
}

module.exports = {
  getProfessores: _getProfessores,
  getProfessor: _getProfessor,
  postProfessor: _postProfessor,
  deleteProfessor:_deleteProfessor,
  updateProfessor: _updateProfessor
}
