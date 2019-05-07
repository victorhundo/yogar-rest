//Libraries
const express = require('express');
var auth = require('../modules/authControl');


//controllers
var post = require('../controllers/post');

var router = express.Router({ mergeParams: true });
var routerAuthID = express.Router();
routerAuthID.use(auth.authorizeUser);

// Aluno routes
router.route('/')
    .get(post.getPosts)
    .post(post.insertPost);
router.route('/:id')
    .get(routerAuthID, post.getPost)
    .delete(routerAuthID, post.deletePost)
    .put(routerAuthID, post.updatePost);

module.exports = router;
