//Libraries
const express = require('express');
//controllers
var chat = require('../controllers/chat');

const app = express();

// Admin routes
app.route('/')
    .get(chat.getChats)
app.route('/:id')
    .get(chat.getChat)

module.exports = app;
