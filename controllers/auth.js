var util = require('util');
var Aluno = require('../models/aluno');
var Professor = require('../models/professor');
var db = require('../modules/db');
var query = require('../modules/query');
var uuidv1 = require('uuid/v1');
var jwt  = require('jsonwebtoken');

/*config*/
var config = require('../config.js');

var _login = (req, res) => {
  code = undefined;
  msg = undefined
  Aluno.find(req.body.uuid)
  .then((success) => {
    if(success.length > 0){
      var token = jwt.sign({id: req.body.uuid, permissao: ['aluno']}, config.sekretoJWT, {expiresIn: "30d"});
      msg = {token: token, type: 'aluno', aluno: success};
      code = 200;
    } else{
      return Professor.find(req.body.uuid);
    }
  })
  .then((success) => {
    if(success != undefined && success.length > 0){
      var token = jwt.sign({id: req.body.uuid, permissao: ['professor']}, config.sekretoJWT, {expiresIn: "30d"});
      msg = {token: token, type: 'professor', professor: success};
      code = 200;
    }
    else if (!code){
      msg = {"msg":"Usuário não cadastrado."};
      code = 401;
    }
  })
  .then((success) => {
    res.status(code).send(msg)
  }, (error) => { console.log(error); res.status(500).send("Internal Server Error");})
}

module.exports = {
  login: _login
}
