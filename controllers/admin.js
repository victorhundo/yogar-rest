var util = require('util');
var Admin = require('../models/admin');
var db = require('../modules/db');
var query = require('../modules/query');
var uuidv1 = require('uuid/v1');

/*
  GET /admin
*/
var _getAdmins = (req, res) => {
  Admin.find()
  .then((sucess) => {
    var admins = sucess;
    admins = admins.filter(query.search(req.query));
    res.status(200).send(admins);
  });
}

/*
  GET /admin/:id
*/
var _getAdmin = (req, res) => {
  Admin.find(req.params.id)
  .then((sucess) => {
      var admin = sucess;
      res.status(200).send(admin);
  });
}

/*
  Create admin
*/
var _postAdmin = (req, res) => {
  var uuid = uuidv1(); // Generate UUID
  Admin.find(uuid)
  .then((sucess) => {
    if(sucess.length == 0){
      return Admin.insert(
        uuid,
        req.body.email,
        req.body.login
      )
    } else{
      _postAdmin(req,res);
    }
  })
  .then(
    (success) => { res.status(201).send({"insertId":uuid});},
    (error) => { res.status(500).send("Internal Server Error");}
  );
}

/*
  DELETE /admin
*/
var _deleteAdmin = (req, res) => {
  Admin.delete(req.params.id)
  .then((sucess) => {
    return Admin.find(req.params.id)
  })
  .then((sucess) => {
    if(sucess.length <= 0)
      res.status(200).send({message: 'Ok'});
    else
      res.status(500).send({message: 'Internal Error'});
  });
}

/*
  UPDATE /admin
*/
var _updateAdmin = (req, res) => {
  if (req.body.campo == 'id')
    res.status(403).send({message: "você não pode atualizar o ID"})
  Admin.update(req.params.id, req.body.campo, req.body.valor)
  .then((sucess) => {
      if (sucess) {
        res.status(200).send({message: "Atualização feita com sucesso"});
      } else {
        res.status(500).send({message: "Erro no servidor"});
      }
  });
}

module.exports = {
  getAdmins: _getAdmins,
  getAdmin: _getAdmin,
  postAdmin: _postAdmin,
  deleteAdmin:_deleteAdmin,
  updateAdmin: _updateAdmin
}
