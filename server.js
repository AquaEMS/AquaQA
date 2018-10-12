var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const config = require('./server_conf');

var app = express();
var jsonParser = bodyParser.json()


var connection = mysql.createConnection({
  socket: config.db_socket,
  user: config.db_user,
  password: config.db_password,
  database: config.db_database
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

// app.get('/api/:table/:token', function(req, res) {
//   if (req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
//     res.status(403).send();
//   } else if (req.params.table == "users") {
//     res.status(403).send();
//   } else {
//     c.query('SELECT * from `' + req.params.table + '`;', function(error, results, fields) {
//       if (error) { res.status(400).send(); throw error; }
//       if (results.length == 0) {
//         res.status(204).send();
//       } else {
//         res.status(201).send(results);
//       }
//     });
//   }
// });

app.get("/api/get/tics/:token", function(req, res) {
  if (req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
    res.status(403).send();
  } else {
    c.query("SELECT user_id, first, last, 900 FROM users WHERE active = 1 ORDER BY 900", function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
})

app.get("/api/get/preceptors/:token", function(req, res) {
  if (req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
    res.status(403).send();
  } else {
    c.query("SELECT user_id, first, last, 900 FROM users WHERE preceptor = 1 AND active = 1 ORDER BY 900", function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
})

app.get("/api/get/admins/:token", function(req, res) {
  if (req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
    res.status(403).send();
  } else {
    c.query("SELECT user_id, first, last FROM users WHERE admin = 1 ORDER BY last, first", function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
})

app.get("/api/get/users/:token", function(req, res) {
  if (req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
    res.status(403).send();
  } else {
    c.query("SELECT user_id, 900, first, last FROM users ORDER BY 900", function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
})

app.get("/api/get/user/:user_id/:token", function(req, res) {
  if (req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
    res.status(403).send();
  } else {
    c.query("SELECT * FROM users WHERE user_id = ?", [req.params.user_id], function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
})

app.get("/api/get/qas/:token", function(req, res) {
  if (req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
    res.status(403).send();
  } else {
    c.query("SELECT qa_id, prid, date, tic, reviewer, reviewDate FROM qas ORDER BY prid, qa_id", function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
})

app.get("/api/get/determinants/:token", function(req, res) {
  if (req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
    res.status(403).send();
  } else {
    c.query("SELECT * FROM determinants ORDER BY determinantOrder", function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
})

app.get("/api/get/qa/:qa_id/:token", function(req, res) {
  if (req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
    res.status(403).send();
  } else {
    c.query("SELECT * FROM qas WHERE qa_id = ?", [req.params.qa_id], function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
})

app.get("/api/get/qa/:qa_id/questions/:token", function(req, res) {
  if (req.params.token != "y9QoBe1bTC") { // TODO: Change to seesion id
    res.status(403).send();
  } else {
    c.query("SELECT * FROM questions WHERE active = 1 ORDER BY questionOrder", function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
})

app.post("/api/new/user", function(req, res) {
  c.query("INSERT INTO `user` SET ?", req.body[0], function(error, results, field) {
    if (error) { res.status(400).send(); throw error; } // TODO: add session check
  });
})

app.post("/api/new/question", function(req, res) {
  c.query("INSERT INTO `questions` SET ?", req.body[0], function(error, results, field) {
    if (error) { res.status(400).send(); throw error; } // TODO: add session check
  });
})

app.post("/api/new/category", function(req, res) {
  c.query("INSERT INTO `category` SET ?", req.body[0], function(error, results, field) {
    if (error) { res.status(400).send(); throw error; } // TODO: add session check
  });
})

app.post('/api/new/qa', jsonParser, function(req, res) {
  c.query("INSERT INTO `qas` SET ?", req.body[0], function(error, results, field) {
    if (error) { res.status(400).send(); throw error; } // TODO: add session check
    for (var x = 0; x < req.body[1].questions.length; x++) {
      req.body[1].questions[x].qa_id = results.insertId;
      c.query("INSERT INTO `qasQuestions` SET ?", req.body[1].questions[x], function(error, results, field) {
        if (error) throw error;
      });
    }
    res.status(200).send(); // TODO: send confirmation
  });
});
