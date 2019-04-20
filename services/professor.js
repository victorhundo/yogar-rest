//Libraries
const express = require('express');

//controllers
var professor = require('../controllers/professor');

const app = express();

// professor routes
app.route('/')
    .get(professor.getProfessores)
    .post(professor.postProfessor);
app.route('/:id')
    .get(professor.getProfessor)
    .delete(professor.deleteProfessor)
    .put(professor.updateProfessor);

module.exports = app;
