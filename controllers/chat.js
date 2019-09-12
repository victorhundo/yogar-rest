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
  Chat.find(req.params.id)
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
        obj.remetente
      )
}


module.exports = {
  getChats: _getChats,
  getChat: _getChat,
  postChat: _postChat,
}
