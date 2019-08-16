module.exports = function() {
  this.mysql = require("mysql");
  this.Promise = require("promise");

  this.config = require("./server_conf");

  this.apirouter = express.Router();

  /* GET home page. */
  this.apirouter.get("/", function(req, res, next) {
    res.send("Express RESTful API");
  });

  this.c = mysql.createConnection({
    socket: config.db_socket,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database
  });

  this.c.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("MariaDB connected as id " + c.threadId);
  });

  this.apirouter.get("/get/tics/:token", function(req, res) {
    if (!dev && !(isAdmin(req.params.token) || isQa(req.params.token))) {
      res.status(403).send();
    } else {
      c.query(
        "SELECT user_id, first, last, ninehundred FROM users WHERE active = 1 ORDER BY ninehundred",
        function(error, results, fields) {
          if (error) res.status(400).send(errorResponse("/get/tics", 400));
          if (results.length == 0) {
            res.status(204).send();
          } else {
            res.status(201).send(results);
          }
        }
      );
    }
  });

  apirouter.get("/get/preceptors/:token", function(req, res) {
    // if user isn't an admin or a qa person
    if (!dev && !(isAdmin(req.params.token) || isQa(req.params.token))) {
      res.status(403).send();
    } else {
      c.query(
        "SELECT user_id, first, last, ninehundred FROM users WHERE preceptor = 1 AND active = 1 ORDER BY ninehundred",
        function(error, results, fields) {
          if (error)
            res.status(400).send(errorResponse("/get/preceptors", 400));
          if (results.length == 0) {
            res.status(204).send();
          } else {
            res.status(201).send(results);
          }
        }
      );
    }
  });

  apirouter.get("/get/admins/:token", function(req, res) {
    //if user isn't an admin
    if (!dev && !isAdmin(req.params.token)) {
      res.status(403).send();
    } else {
      c.query(
        "SELECT user_id, first, last FROM users WHERE admin = 1 ORDER BY last, first",
        function(error, results, fields) {
          if (error) res.status(400).send(errorResponse("/get/admins", 400));
          if (results.length == 0) {
            res.status(204).send();
          } else {
            res.status(201).send(results);
          }
        }
      );
    }
  });

  apirouter.get("/get/users/:token", function(req, res) {
    //if user isn't an admin
    if (!dev && !isAdmin(req.params.token)) {
      res.status(403).send();
    } else {
      c.query(
        "SELECT user_id, ninehundred, first, last FROM users ORDER BY ninehundred",
        function(error, results, fields) {
          if (error) res.status(400).send(errorResponse("/get/users", 400));
          if (results.length == 0) {
            res.status(204).send();
          } else {
            res.status(201).send(results);
          }
        }
      );
    }
  });

  apirouter.get("/get/me/:token", function(req, res) {
    let userId = getUserId(req.params.token);

    //if user not logged in
    if (!dev && userId != -1) {
      res.status(403).send();
    } else {
      c.query("SELECT * FROM users WHERE user_id = ?", userId, function(
        error,
        results,
        fields
      ) {
        if (error) res.status(400).send(errorResponse("/get/me", 400));
        if (results.length == 0) {
          res.status(204).send();
        } else {
          res.status(201).send(results);
        }
      });
    }
  });

  apirouter.get("/get/user/:user_id/:token", function(req, res) {
    //if user isn't an admin or requesting info about themselves
    if (
      !dev &&
      !(
        isAdmin(req.params.token) ||
        getUserId(req.params.token) == req.params.user_id
      )
    ) {
      res.status(403).send();
    } else {
      c.query(
        "SELECT * FROM users WHERE user_id = ?",
        [req.params.user_id],
        function(error, results, fields) {
          if (error)
            res
              .status(400)
              .send(errorResponse("/get/user/" + req.params.user_id, 400));
          if (results.length == 0) {
            res.status(204).send();
          } else {
            res.status(201).send(results);
          }
        }
      );
    }
  });

  apirouter.get("/get/qas/:token", function(req, res) {
    let userId = getUserId(req.cookies.AQEMS_SESSION);

    //if user not logged in
    if (!dev && userId != -1) {
      res.status(403).send();

      //if user isn't an admin or a qa person
    } else if (!dev && !(isAdmin(req.params.token) || isQa(req.params.token))) {
      c.query(
        "SELECT qa_id, prid, date, tic, reviewer, reviewDate FROM qas WHERE tic = ? OR preceptor = ? ORDER BY prid, qa_id",
        [userId, userId],
        function(error, results, fields) {
          if (error) res.status(400).send(errorResponse("/get/qas", 400));
          if (results.length == 0) {
            res.status(204).send();
          } else {
            res.status(201).send(results);
          }
        }
      );

      // if user is admin or qa person
    } else {
      c.query(
        "SELECT qa_id, prid, date, tic, reviewer, reviewDate FROM qas ORDER BY prid, qa_id",
        function(error, results, fields) {
          if (error) res.status(400).send(errorResponse("/get/qas", 400));
          if (results.length == 0) {
            res.status(204).send();
          } else {
            res.status(201).send(results);
          }
        }
      );
    }
  });

  apirouter.get("/get/determinants/:token", function(req, res) {
    if (req.params.token != "y9QoBe1bTC") {
      // TODO: Change to seesion id
      res.status(403).send();
    } else {
      c.query("SELECT * FROM determinants ORDER BY determinantOrder", function(
        error,
        results,
        fields
      ) {
        if (error)
          res.status(400).send(errorResponse("/get/determinants", 400));
        if (results.length == 0) {
          res.status(204).send();
        } else {
          res.status(201).send(results);
        }
      });
    }
  });

  apirouter.get("/get/qa/:qa_id/:token", function(req, res) {
    if (req.params.token != "y9QoBe1bTC") {
      // TODO: Change to seesion id
      res.status(403).send();
    } else {
      c.query("SELECT * FROM qas WHERE qa_id = ?", [req.params.qa_id], function(
        error,
        results,
        fields
      ) {
        // TODO: add questions to this
        if (error)
          res
            .status(400)
            .send(errorResponse("/get/qa/" + req.params.qa_id, 400));
        if (results.length == 0) {
          res.status(204).send();
        } else {
          res.status(201).send(results);
        }
      });
    }
  });

  apirouter.get("/get/questions", async (req, res) => {
    try {
      const categories = await get_data("SELECT * FROM categories");
      const result = await Promise.all(
        categories.map(async ({ category_id, name }) => {
          const questions = await get_data(
            "SELECT * FROM questions WHERE category = ? AND ACTIVE = 1",
            [category_id]
          );
          return { category_id, name, questions };
        })
      );
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(errorResponse("/get/questions", 400));
    }
  });

  apirouter.post("/new/user", function(req, res) {
    console.log(req.body);
    c.query("INSERT INTO `users` SET ?", req.body, function(
      error,
      results,
      fields
    ) {
      if (error) res.status(400).send(errorResponse("new/user", 400));
      // TODO: add session check
      else {
        res.status(200).send();
      }
    });
  });

  apirouter.post("/new/question", function(req, res) {
    c.query("INSERT INTO `questions` SET ?", req.body[0], function(
      error,
      results,
      fields
    ) {
      if (error) res.status(400).send(errorResponse("new/question", 400)); // TODO: add session check
    });
  });

  apirouter.post("/new/category", function(req, res) {
    c.query("INSERT INTO `category` SET ?", req.body[0], function(
      error,
      results,
      fields
    ) {
      if (error) res.status(400).send(errorResponse("new/category", 400)); // TODO: add session check
    });
  });

  apirouter.post("/new/qa", jsonParser, function(req, res) {
    var questions = req.body.questions;
    console.log("Questions:");
    console.log(questions);
    delete req.body.questions;
    console.log("No questions:");
    console.log(req.body);
    c.query("INSERT INTO `qas` SET ?", req.body, function(
      error,
      results,
      fields
    ) {
      if (error) console.log(error);
      // res.status(400).send(errorResponse("new/qa", 400)); // TODO: add session check
      for (var x = 0; x < questions.length; x++) {
        questions[x].qa_id = results.insertId;
        c.query("INSERT INTO `qasQuestions` SET ?", questions, function(
          error,
          results,
          fields
        ) {
          if (error) res.status(400).send(errorResponse("new/qa", 400)); // TODO: add session check
        });
      }
      res.status(200).send(); // TODO: send confirmation
    });
  });
};
