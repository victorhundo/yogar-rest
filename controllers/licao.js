var util = require('util');
var Licao = require('../models/licao');
var db = require('../modules/db');
var file = require('../modules/file');
var query = require('../modules/query');
var uuidv1 = require('uuid/v1');
var fs = require('fs');



/*
  GET /licoes
*/
var _getLicoes = (req, res) => {
  Licao.find()
  .then((sucess) => {
    var posts = sucess;
    posts = posts.filter(query.search(req.query));
    res.status(200).send(posts);
  });
}


/*
  GET /professores/:idProfessor/licoes
*/
var _getLicao = (req, res) => {
  Licao.find(req.params.idProfessor)
  .then((sucess) => {
    var posts = sucess;
    posts = posts.filter(query.search(req.query));
    res.status(200).send(posts);
  });
}


/*
  GET /professores/:idProfessor/posts/:id
*/
var _getLicao = (req, res) => {
  Licao.find(req.params.idProfessor, Number(req.params.id))
  .then((sucess) => {
      var post = sucess;
      res.status(200).send(post);
  });
}

/*
  DELETE /licoes/:id
*/
var _deleteLicao = (req, res) => {
  Licao.delete(req.params.id)
  .then((sucess) => {
    return Licao.find(req.params.id)
  })
  .then((sucess) => {
    if(sucess.length <= 0)
      res.status(200).send({message: 'Ok'});
    else
      res.status(500).send({message: 'Internal Error'});
  });
}

/*
  UPDATE /licoes/:id
*/
var _updateLicao = (req, res) => {
  if (req.body.campo == 'id')
    res.status(403).send({message: "você não pode atualizar o ID"})
  Licao.update(req.params.id, req.body.campo, req.body.valor)
  .then((sucess) => {
      if (sucess) {
        res.status(200).send({message: "Atualização feita com sucesso"});
      } else {
        res.status(500).send({message: "Erro no servidor"});
      }
  });
}

var _postLicao = (req,res) => {
  if (req.params.idProfessor == undefined ) {
    return res.status(400).send({"msg":"Bad Request"});
  }
  Licao.insert(
        req.params.idProfessor,
        req.body.titulo,
        req.body.descricao,
        Number(req.body.nivel),
        req.body.tag,
        req.file.filename,
        Boolean(req.body.ehPremium),
        Number(req.body.recompensa)
      )
  .then( (success) => {
        if (success == undefined)
          res.status(500).send({message: 'Internal Error'});
        else
          res.status(201).send({message: 'Ok'});
  });
}


var _getLicaoVideo = (req,res) => {
  Licao.find(req.params.idProfessor, Number(req.params.id))
  .then((sucess) => {
      try{
        var video = fs.readFileSync('/data/user/professor/' + req.params.idProfessor + '/' + sucess[0]["video"]);
        res.writeHead(200,{'Content-type':'video/mp4'});
        res.end(video);
      }catch (err){
        console.log(err);
        res.send('No file found');
      }
  });
}

module.exports = {
  getLicoes: _getLicoes,
  getLicoes:_getLicoes,
  getLicao: _getLicao,
  postLicao: _postLicao,
  deleteLicao:_deleteLicao,
  updateLicao: _updateLicao,
  getLicaoVideo: _getLicaoVideo
}
