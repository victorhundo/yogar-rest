//Libraries
const express = require('express');

//controllers
var auth = require('../controllers/auth');

const app = express();

// Aluno routes
app.route('/login')
    .post(auth.login);

module.exports = app;
