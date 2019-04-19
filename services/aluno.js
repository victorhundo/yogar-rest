//Libraries
const express = require('express');

//controllers
var aluno = require('../controllers/aluno');

const app = express();

// Aluno routes
app.route('/')
    .get(aluno.getAlunos)
    .post(aluno.postAluno);
app.route('/:id')
    .get(aluno.getAluno)
    .delete(aluno.deleteAluno)
    .put(aluno.updateAluno); 

module.exports = app;
