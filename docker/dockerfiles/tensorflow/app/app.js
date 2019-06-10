var express = require('express');
var app = express();
var cors = require('cors');
var exec = require('child_process').exec;
var multer = require('multer');
var bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

//Allow Cross
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers',
                  'X-Requested-With, content-type, Authorization, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE');
    next();
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        cb(null, '/tf_files');
    },
    filename: function (req, file, cb) {

        // error first callback
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage });

var execShellCommand = (cmd) => {
 return new Promise((resolve, reject) => {
  exec(cmd, (error, stdout, stderr) => {
   if (error) {
    console.warn(error);
   }
   resolve(stdout? stdout : stderr);
  });
 });
}

app.get('/desafio', function (req, res) {
  execShellCommand("ls -la").then((success) => {
    console.log(success);
    res.status(201).send({message: req.params});
  })
});

app.post('/desafio', upload.single('theFile'), (req,res) => {
  execShellCommand("bash /app/run.sh " + req.file.filename).then((success) => {
    out = [];
    for(var i = 0; i < success.split('\n').length - 1; i++) {
      pts = Number(success.split('\n')[i].split('(')[1].split(')')[0].split('=')[1].trim());
      nome = success.split('\n')[i].split('(')[0].trim();
      out.push({nome,pts});
    }
    res.status(201).send({message: out});
  })
})

app.get('/status', function (req, res) {
  res.status(200).send('hello world!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
