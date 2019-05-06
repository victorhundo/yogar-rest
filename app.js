const express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var util = require('util');
var bodyParser  = require('body-parser');
var multer = require('multer');
var morgan = require('morgan');
require('shelljs/global');

app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.use(cors({origin: '*'}));

//Allow Cross
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers',
                  'X-Requested-With, content-type, Authorization, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE');
    next();
});

//Hello World
app.get('/', function (req, res) {
   res.json({message: 'Olá Mundo!'});
});

//Routes
aluno = require('./services/aluno');
professor = require('./services/professor');
post = require('./services/post');
auth = require('./services/auth');


// Mouting applications.
app.use('/alunos', aluno);
app.use('/professores', professor);
app.use('/posts', post);
app.use('/auth', auth);

module.exports = {
  app: app
}
