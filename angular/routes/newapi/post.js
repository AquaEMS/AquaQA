//node packages
const bodyParser = require("body-parser");

//local packages
const { c } = require("path/to/dbconnection.js");
const { errorResponse } = require("path/to/apiFunction.js");

//local package config
const jsonParser = bodyParser.json();

module.exports = app => {
  app.post("/new/user", function({ body }, res) {
    console.log(body);
    c.query("INSERT INTO `users` SET ?", body, function(error) {
      if (error) res.status(400).send(errorResponse("new/user", 400));
      // TODO: add session check
      else {
        res.status(200).send();
      }
    });
  });

  app.post("/new/question", function({ body }, res) {
    c.query("INSERT INTO `questions` SET ?", body[0], function(error) {
      if (error) res.status(400).send(errorResponse("new/question", 400)); // TODO: add session check
    });
  });

  app.post("/new/category", function({ body }, res) {
    c.query("INSERT INTO `category` SET ?", body[0], function(error) {
      if (error) res.status(400).send(errorResponse("new/category", 400)); // TODO: add session check
    });
  });

  app.post("/new/qa", jsonParser, function({ body }, res) {
    c.query("INSERT INTO `qas` SET ?", body, function(error, results) {
      if (error) console.log(error);
      // res.status(400).send(errorResponse("new/qa", 400)); // TODO: add session check
      for (let x = 0; x < body.questions.length; x++) {
        body.questions[x].qa_id = results.insertId;
        c.query("INSERT INTO `qasQuestions` SET ?", body.questions, function(
          error
        ) {
          if (error) res.status(400).send(errorResponse("new/qa", 400)); // TODO: add session check
        });
      }
      res.status(200).send(); // TODO: send confirmation
    });
  });
};
