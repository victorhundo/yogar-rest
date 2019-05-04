var supertest = require('supertest');
var chai = require('chai');
var util = require('util');
var jwt  = require('jsonwebtoken');
var config = require('../config.js');
var app = require('../app').app;
var db = require('../modules/db');
var async = require('async');
var {readFileSync} = require('fs');


global.app = app;
global.request = supertest(app);
global.async = async;
global.expect = chai.expect;
global.should = chai.should();

global.cleanTable = (name, done) => {
  var query = util.format('DELETE FROM `%s`', name);
  db.mysqlExec(query).then((result) => {});
}

global.generateToken = (type) => {
  if (type == 'admin'){
    return jwt.sign(
      {id: 'admin-uuid', permissao: ['aluno','professor','admin']},
      config.sekretoJWT,
      {expiresIn: "30d"}
    );
  } else {
    return jwt.sign(
      {id: 'aluno-uuid', permissao: ['aluno']},
      config.sekretoJWT,
      {expiresIn: "30d"}
    );
  }
}
