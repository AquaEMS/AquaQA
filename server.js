var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');


var app = express();
var jsonParser = bodyParser.json()


var connection = mysql.createConnection({
  socket: '/tmp/mysql.sock',
  user: 'aqua',
  password: 'testpassword1',
  database: 'aqua'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('MariaDB connected as id ' + connection.threadId);
});


app.listen(3000, function() {
  console.log('Aqua is running!');
});

app.get(['/api/:table/:token', '/api/:table'], function(req, res) {
  if (!req.params.token || req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
    res.status(403).send();
  } else {
    connection.query('SELECT * from `' + req.params.table + '`;', function(error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
});

app.post('/api/newqa/', jsonParser, function(req, res) {
  connection.query("INSERT INTO `qas` SET ?", req.body[0], function(error, results, field) {
    if (error) throw error;
    for (var x = 0; x < req.body[1].questions.length; x++) {
      req.body[1].questions[x].qa_id = results.insertId;
      connection.query("INSERT INTO `qasQuestions` SET ?", req.body[1].questions[x], function(error, results, field) {
        if (error) throw error;
      });
    }
    res.status(200).send(); // TODO: send confirmation
  });
});
