//Libraries
const express = require('express');
var auth = require('../modules/authControl');

//controllers
var aluno = require('../controllers/post');

const app = express();

var routerAuthID = express.Router();
routerAuthID.use(auth.authorizeUser);

// Aluno routes
app.route('/')
    .get(routerAuthID, aluno.getPosts)
    .post(aluno.insertPost);
app.route('/:id')
    .get(routerAuthID, aluno.getPost)
    .delete(routerAuthID, aluno.deletePost)
    .put(routerAuthID, aluno.updatePost);

module.exports = app;
