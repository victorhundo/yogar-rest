//Libraries
const express = require('express');
var auth = require('../modules/authControl');

//controllers
var professor = require('../controllers/professor');

const app = express();

var routerAuthID = express.Router();
routerAuthID.use(auth.authorizeUser);

// professor routes
app.route('/')
    .get(routerAuthID, professor.getProfessores)
    .post(professor.postProfessor);
app.route('/:id')
    .get(routerAuthID, professor.getProfessor)
    .delete(routerAuthID, professor.deleteProfessor)
    .put(routerAuthID, professor.updateProfessor);

module.exports = app;
