var express = require('express');
var app = express();
var exec = require('child_process').exec;

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

app.get('/', function (req, res) {
  execShellCommand("ls -la").then((success) => {
    console.log(success);
    res.status(201).send({message: 'Ok'});
  })
});

app.get('/status', function (req, res) {
  res.status(200).send('hello world!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
