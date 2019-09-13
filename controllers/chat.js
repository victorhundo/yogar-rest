var util = require('util');
var Chat = require('../models/chat');
var db = require('../modules/db');
var query = require('../modules/query');
var uuidv1 = require('uuid/v1');

/*
  GET /chat
*/
var _getChats = (req, res) => {
  Chat.find()
  .then((sucess) => {
    var chats = sucess;
    chats = chats.filter(query.search(req.query));
    res.status(200).send(chats);
  });
}

/*
  GET /chat/:id
*/
var _getChat = (req, res) => {
  if (req.params.id.length > 36){
    Chat.find(req.params.id)
    .then((sucess) => {
      var chat = sucess;
      res.status(200).send(chat);
    });
  }else {
    _getAlunoChats(req,res);
  }
}

var _getAlunoChats = (req, res) => {
  Chat.findAlunos(req.params.id)
  .then((sucess) => {
    const chats = sucess;

    async function setChats(){
      for(const [idx,chat] of chats.entries()){
        const saida = await Chat.findChatsByAluno(req.params.id, chat["uuidAluno"]);
        chat["chats"] = saida;
      }
    }

    setChats().then((sucess) => {
      res.status(200).send(chats);
    })
  });
}

var _getChatsByAluno = (req, res) => {
  Chat.findChatsByAluno(req.params.id, req.params.idAluno)
  .then((sucess) => {
    var chat = sucess;
    res.status(200).send(chat);
  });
}

/*
  Create chat
*/
var _postChat = (obj) => {
  var datetime = new Date();
    Chat.insert(
        obj.room,
        obj.professor,
        obj.aluno,
        obj.licao,
        datetime,
        obj.msg,
        obj.remetente,
        obj.alunoNome,
        obj.licaoTitulo
      )
}


module.exports = {
  getChats: _getChats,
  getChat: _getChat,
  postChat: _postChat,
  getAlunoChats:_getAlunoChats,
  getChatsByAluno:_getChatsByAluno,
}
