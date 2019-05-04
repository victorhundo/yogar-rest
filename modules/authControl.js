var jwt    = require('jsonwebtoken');
var config = require('../config.js');

var _checkToken = (token, req, res, next) => {
  jwt.verify(token, config.sekretoJWT, (err, decoded) => {
    if (err) return res.status(403).send({ success: false, message: 'O token não está correto.'})
    else if (decoded.permissao.includes('admin')) next(); // Admin pode tudo
    else if (req.originalUrl.split('/').includes(decoded.id)) next(); // Usuário logado acessando suas informações
    else res.status(403).send("forbidden.")
  });
}

var _authorizeUser = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token) _checkToken(token, req, res, next);
  else res.status(403).send("forbidden.");
}

module.exports = {
  authorizeUser: _authorizeUser,
}
