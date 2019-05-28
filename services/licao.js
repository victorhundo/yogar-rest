//Libraries
const express = require('express');
var auth = require('../modules/authControl');
// for parsing multipart/form-data
const upload = require('../modules/file')

//controllers
var licoes = require('../controllers/licao');

var router = express.Router({ mergeParams: true });
var routerAuthID = express.Router();
routerAuthID.use(auth.authorizeUser);

// Aluno routes
router.route('/')
    .get(licoes.getLicoes)
    .post(upload.single('theFile'), licoes.postLicao);

router.route('/:id')
    .get(licoes.getLicao)
    .delete(routerAuthID, licoes.deleteLicao)
    .put(routerAuthID, licoes.updateLicao);

router.route('/:id/video')
    .get(licoes.getLicaoVideo)

module.exports = router;
