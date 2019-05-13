var util = require('util');
var Post = require('../models/post');
var db = require('../modules/db');
var query = require('../modules/query');
var uuidv1 = require('uuid/v1');


/*
  GET /posts
*/
var _getAllPosts = (req, res) => {
  Post.find()
  .then((sucess) => {
    var posts = sucess;
    posts = posts.filter(query.search(req.query));
    res.status(200).send(posts);
  });
}


/*
  GET /professores/:idProfessor/posts
*/
var _getPosts = (req, res) => {
  Post.find(req.params.idProfessor)
  .then((sucess) => {
    var posts = sucess;
    posts = posts.filter(query.search(req.query));
    res.status(200).send(posts);
  });
}


/*
  GET /professores/:idProfessor/posts/:id
*/
var _getPost = (req, res) => {
  Aluno.find(req.params.idProfessor, req.params.id)
  .then((sucess) => {
      var post = sucess;
      res.status(200).send(post);
  });
}

var _insertPost = (req, res) => {
  if (req.params.idProfessor == undefined ) {
    return res.status(400).send({"msg":"Bad Request"});
  }

  if (req.body.img == undefined) req.body.img = "https://lifenlesson.com/wp-content/uploads/2017/02/Bakasana-1-1024x682.jpg";
  var datetime = new Date();
  Post.insert(
        req.body.titulo,
        req.body.texto,
        req.params.idProfessor,
        datetime,
        req.body.img,
      )
    .then(
    (success) => { res.status(201).send({"insertId":success});},
    (error) => { res.status(500).send("Internal Server Error");}
  );
}

/*
  DELETE /professores/:idProfessor/post
*/
var _deletePost = (req, res) => {
  Post.delete(req.params.id)
  .then((sucess) => {
    return Aluno.find(req.params.id)
  })
  .then((sucess) => {
    if(sucess.length <= 0)
      res.status(200).send({message: 'Ok'});
    else
      res.status(500).send({message: 'Internal Error'});
  });
}

/*
  UPDATE /professores/:idProfessor/posts/:id
*/
var _updatePost = (req, res) => {
  if (req.body.campo == 'id')
    res.status(403).send({message: "você não pode atualizar o ID"})
  Post.update(req.params.id, req.body.campo, req.body.valor)
  .then((sucess) => {
      if (sucess) {
        res.status(200).send({message: "Atualização feita com sucesso"});
      } else {
        res.status(500).send({message: "Erro no servidor"});
      }
  });
}

module.exports = {
  getPosts: _getPosts,
  getAllPosts:_getAllPosts,
  getPost: _getPost,
  insertPost: _insertPost,
  deletePost:_deletePost,
  updatePost: _updatePost
}
