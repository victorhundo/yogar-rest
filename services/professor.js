//Libraries
const express = require('express');
var auth = require('../modules/authControl');
var posts = require('./post');
var licoes = require('./licao');

//controllers
var professor = require('../controllers/professor');

const app = express();

var routerAuthID = express.Router();
var router = express.Router({ mergeParams: true });
routerAuthID.use(auth.authorizeUser);

router.use('/:idProfessor/posts', posts);
router.use('/:idProfessor/licoes', licoes);

// professor routes
router.route('/')
    .get(routerAuthID, professor.getProfessores)
    .post(professor.postProfessor);
router.route('/:idProfessor')
    .get(routerAuthID, professor.getProfessor)
    .delete(routerAuthID, professor.deleteProfessor)
    .put(routerAuthID, professor.updateProfessor);

module.exports = router;
