var mysql = require('mysql2');

var db_config = {
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: 'root',
  database: 'yogar',
  typeCast: function castField( field, useDefaultTypeCasting ) {
    if ((field.type === "BIT" ) && (field.length === 1)) {
      var bytes = field.buffer();
      if(bytes != null)
        return (bytes[0] === 1);
      else
        return false;
      }
    return(useDefaultTypeCasting());
  }
}

var connection = mysql.createConnection(db_config);

connection.connect(function(error) {
  if (error != null) {
    console.err(error.code); // 'ECONNREFUSED'
    console.err(error); // true
  }
});


var _escape = function(uzantQuery) {
  return connection.escape(uzantQuery);
}

var _escapeId = function(uzantQuery) {
  return connection.escapeId(uzantQuery);
}

var _escapeArgs = function(args) {
  var argChecked = [];
  for(var i = 0; i < args.length; i ++) {
    if (args[i]) {
      var result = _escape(args[i]).split(',');
      if (result.length > 1){
        newObj = {}
        for ( var j = 0; j < result.length; j++ ){
          if (result[j].match('=')){
            var nome = [result[j].split('=')[0]]
            nome = nome.toString().replace(/`/g, "").trim()
            var valor = result[j].split('=')[1]
            newObj[nome] = valor
          }
        }
        if(Object.keys(newObj).length) {
          args[i] = newObj;
          argChecked.push(newObj);
        }
      }else{
        args[i] = _escape(args[i])
        argChecked.push(args[i]);
      }
    }
  }
  return argChecked;
}

var _mysqlExec = function(query){
  return new Promise(function(resolve, reject){
    connection.query(query, function (err, results, fields) {
      if (err != null) {
        console.log(query, err.code);
        console.log(query, err.sqlMessage);
      }
      resolve(results);
      return results;
    });
  });
}

module.exports = {
  mysqlExec:_mysqlExec,
  escape: _escape,
  escapeArgs: _escapeArgs,
  escapeId: _escapeId
}
