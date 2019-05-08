var util = require('util');
var db = require('../modules/db');

var _findLogin = function(username){
    username = db.escape(username);
    var query = util.format('SELECT username, uuid, senha \
                             FROM `admin` WHERE `username` = %s;', username);
  return db.mysqlExec(query);
}

module.exports = {
  findLogin:_findLogin,
}
