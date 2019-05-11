//Libraries
const express = require('express');
var auth = require('../modules/authControl');

//controllers
var aluno = require('../controllers/aluno');

const app = express();

var routerAuthID = express.Router();
routerAuthID.use(auth.authorizeUser);

// Aluno routes
app.route('/')
    .get(routerAuthID, aluno.getAlunos)
    .post(aluno.postAluno);
app.route('/:id')
    .get(routerAuthID, aluno.getAluno)
    .delete(routerAuthID, aluno.deleteAluno)
    .put(routerAuthID, aluno.updateAluno);

app.route('/:id/xp')
    .post(routerAuthID, aluno.postAlunoXp);

module.exports = app;
