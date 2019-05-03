var jwt    = require('jsonwebtoken');
var config = require('../config.js');


var _authorizeAluno = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false,
           message: 'O token não está correto.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
}

module.exports = {
  authorizeAluno: _authorizeAluno,
}
