const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const {
  isSignedIn,
  authIsQa,
  getUserIdFromSession,
  get_data,
  errorResponse
} = require("apiFunctions.js");

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/get/tics/:token", function({ params: { token } }, res) {
  if (!(isAdmin(token) || isQa(token))) {
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

router.get("/get/preceptors/:token", function({ params: { token } }, res) {
  // if user isn't an admin or a qa person
  if (!(isAdmin(token) || isQa(token))) {
    res.status(403).send();
  } else {
    c.query(
      "SELECT user_id, first, last, ninehundred FROM users WHERE preceptor = 1 AND active = 1 ORDER BY ninehundred",
      function(error, results, fields) {
        if (error) res.status(400).send(errorResponse("/get/preceptors", 400));
        if (results.length == 0) {
          res.status(204).send();
        } else {
          res.status(201).send(results);
        }
      }
    );
  }
});

router.get("/get/admins/:token", function({ params: { token } }, res) {
  //if user isn't an admin
  if (!isAdmin(token)) {
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

router.get("/get/users/:token", function({ params: { token } }, res) {
  //if user isn't an admin
  if (!isAdmin(token)) {
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

router.get("/get/me/:token", function({ params: { token } }, res) {
  let userId = getUserId(token);

  //if user not logged in
  if (userId != -1) {
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

router.get("/get/user/:user_id/:token", function(
  { params: { token, user_id } },
  res
) {
  //if user isn't an admin or requesting info about themselves
  if (!(isAdmin(token) || getUserId(token) == user_id)) {
    res.status(403).send();
  } else {
    c.query("SELECT * FROM users WHERE user_id = ?", [user_id], function(
      error,
      results,
      fields
    ) {
      if (error)
        res.status(400).send(errorResponse("/get/user/" + user_id, 400));
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
});

router.get("/get/qas/:token", function(
  { cookies: { AQEMS_SESSION }, params: { token } },
  res
) {
  let userId = getUserId(AQEMS_SESSION);

  //if user not logged in
  if (userId != -1) {
    res.status(403).send();

    //if user isn't an admin or a qa person
  } else if (!dev && !(isAdmin(token) || isQa(token))) {
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

router.get("/get/determinants/:token", function({ params: { token } }, res) {
  let userId = getUserId(token);

  //if user not logged in
  if (userId != -1) {
    res.status(403).send();
  } else {
    c.query("SELECT * FROM determinants ORDER BY determinantOrder", function(
      error,
      results,
      fields
    ) {
      if (error) res.status(400).send(errorResponse("/get/determinants", 400));
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
});

router.get("/get/qa/:qa_id/:token", function(
  { params: { token, qa_id } },
  res
) {
  let userId = getUserId(token);

  //if user not logged in
  if (userId != -1) {
    res.status(403).send();
  } else {
    c.query("SELECT * FROM qas WHERE qa_id = ?", [qa_id], function(
      error,
      results,
      fields
    ) {
      // TODO: add questions to this
      if (error) res.status(400).send(errorResponse("/get/qa/" + qa_id, 400));
      if (results.length == 0) {
        res.status(204).send();
      } else {
        res.status(201).send(results);
      }
    });
  }
});

router.get("/get/questions", async (req, res) => {
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
