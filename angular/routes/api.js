var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const config = require('./server_conf');
var jsonParser = bodyParser.json();
var cron = require('node-cron');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});


var c = mysql.createConnection({
  socket: config.db_socket,
  user: config.db_user,
  password: config.db_password,
  database: config.db_database
});

c.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("MariaDB connected as id " + c.threadId);
});


cron.schedule("* 18 * * *", function() {
  getDailySummary(function(data) {

  });
});


function isAdmin(session_id) {
  c.query("SELECT admin FROM users WHERE user_id IN (SELECT user_id FROM sessions WHERE session_id = ?", [session_id], function(error, results, fields) {
    if (error) throw error;
    return (results[0].admin == 1);
  })
}

function isAdmin(session_id) {
  c.query("SELECT qa FROM users WHERE user_id IN (SELECT user_id FROM sessions WHERE session_id = ?", [session_id], function(error, results, fields) {
    if (error) throw error;
    return (results[0].qa == 1);
  })
}

function getUserId(session_id) {
  c.query("SELECT user_id FROM sessions WHERE session_id = ?", [session_id], function(error, results, fields) {
    if (error) throw error;
    if (results.length != 1) return -1;
    return results[0].user_id;
  })
}

function getDailySummary(callback) {
  c.query("SELECT prid, date, tic, preceptor, flagged FROM qas WHERE reviewDate BETWEEN (NOW() - INTERVAL 1 DAY) AND NOW()", function (error, results, fields) {
    callback(results);
  });
}


router.get("/api/get/tics/:token", function(req, res) {
  //if user isn't an admin or a qa person
  if (!(isAdmin(req.params.token) || isQa(req.params.token))) {
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

router.get("/api/get/preceptors/:token", function(req, res) {
  //if user isn't an admin or a qa person
  if (!(isAdmin(req.params.token) || isQa(req.params.token))) {
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

router.get("/api/get/admins/:token", function(req, res) {
  //if user isn't an admin
  if (!isAdmin(req.params.token)) {
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

router.get("/api/get/users/:token", function(req, res) {
  //if user isn't an admin
  // if (!isAdmin(req.params.token)) {
  //   res.status(403).send();
  // } else {
    c.query("SELECT user_id, 900, first, last FROM users ORDER BY 900", function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  //}
})

router.get("/api/get/user/:user_id/:token", function(req, res) {
  //if user isn't an admin or requesting info about themselves
  if (!(isAdmin(req.params.token) || getUserId(req.params.token) == req.params.user_id)) {
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

router.get("/api/get/qas/:token", function(req, res) {
  let userId = getUserId(req.params.token);

  //if user not logged in
  if (userId != -1) {
    res.status(403).send();

    //if user isn't an admin or a qa person
  } else if (!(isAdmin(req.params.token) || isQa(req.params.token))) {
    c.query("SELECT qa_id, prid, date, tic, reviewer, reviewDate FROM qas WHERE tic = ? OR preceptor = ? ORDER BY prid, qa_id", [userId, userId], function(error, results, fields) {
      if (error) { res.status(400).send(); throw error; }
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });

    // if user is admin or qa person
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

router.get("/get/determinants/:token", function(req, res) {
  console.log("GD");
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

router.get("/api/get/qa/:qa_id/:token", function(req, res) {
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

router.get("/api/get/qa/:qa_id/questions/:token", function(req, res) {
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



router.post("/api/new/user", function(req, res) {
  c.query("INSERT INTO `user` SET ?", req.body[0], function(error, results, field) {
    if (error) { res.status(400).send(); throw error; } // TODO: add session check
  });
})

router.post("/api/new/question", function(req, res) {
  c.query("INSERT INTO `questions` SET ?", req.body[0], function(error, results, field) {
    if (error) { res.status(400).send(); throw error; } // TODO: add session check
  });
})

router.post("/api/new/category", function(req, res) {
  c.query("INSERT INTO `category` SET ?", req.body[0], function(error, results, field) {
    if (error) { res.status(400).send(); throw error; } // TODO: add session check
  });
})

router.post('/api/new/qa', jsonParser, function(req, res) {
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

module.exports = router;
