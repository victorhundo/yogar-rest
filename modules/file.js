/*Libraries*/
var util = require('util');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

var myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(req.params)
      cb(null, '/data/user/professor/' + req.params.idProfessor);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
    }
});

module.exports = multer({
  storage: myStorage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new Error('File is not supported'), false)
      return
    }

    cb(null, true)
  }
})
