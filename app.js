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

const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');
 
app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use('/v2', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
auth = require('./services/auth');


var Post = require('./controllers/post');
app.route('/posts').get(Post.getAllPosts)


// Mouting applications.
app.use('/alunos', aluno);
app.use('/professores', professor);
app.use('/auth', auth);

module.exports = {
  app: app
}
