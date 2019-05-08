var util = require('util');
var Aluno = require('../models/aluno');
var Professor = require('../models/professor');
var Admin = require('../models/admin');
var db = require('../modules/db');
var query = require('../modules/query');
var uuidv1 = require('uuid/v1');
var jwt  = require('jsonwebtoken');

/*config*/
var config = require('../config.js');

var _checkFind = (obj, type, pkg) => {
  if      ( obj == undefined || pkg.senha == undefined) return false;
  else if ( obj.length != 1 ) return false;
  else if ( obj[0].senha != pkg.senha) {
    pkg.msg = {"msg":"Usuário ou senha inválidos."};
    pkg.code = 401;
    return false;
  }
  else {
    delete obj[0].senha;
    var token = _generateToken(obj[0], type);
    pkg.msg = {"token": token, "type": type, user: obj[0]};
    pkg.code = 200;
    return true;
  }
}

var _generateToken = (_user, _permissao) => {
  return jwt.sign(
    {id: _user.uuid, permissao: _permissao},
    config.sekretoJWT,
    {expiresIn: "30d"}
  );
}

var _login = (req, res) => {
  pkg = { code: undefined, msg: undefined, senha: req.body.senha }
  Aluno.findLogin(req.body.username)
  .then((success) => {
    if(!_checkFind(success, 'aluno', pkg))
      return Professor.findLogin(req.body.username);
  })
  .then((success) => {
    if(!_checkFind(success, 'professor', pkg))
      return Admin.findLogin(req.body.username);
  })
  .then((success) => {
    if(!_checkFind(success, 'admin', pkg) && pkg.code == undefined){
      pkg.msg = {"msg":"Usuário não cadastrado."};
      pkg.code = 401;
    }
  })
  .then((success) => { res.status(pkg.code).send(pkg.msg) }, (error) => { console.log(error); res.status(500).send("Internal Server Error");})
}

module.exports = {
  login: _login
}
