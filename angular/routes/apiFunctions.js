const c = require('./routes/api').dbconn;

module.exports = function(){

  this.isSignedIn = function(session_id) {
    c.query("SELECT user_id FROM sessions WHERE session_id = ?", session_id, function(error, results, fields) {
      if (error) return -1;
      // TODO: finish this
    })
  }

  this.authIsAdmin = function(session_id) {
    c.query("SELECT admin FROM users WHERE user_id IN (SELECT user_id FROM sessions WHERE session_id = ?", session_id, function(error, results, fields) {
      if (error) return -1; // TODO: handle all these in the API endpoints
      return (results[0].admin == 1);
    })
  }

  this.authIsQa = function(session_id) {
    c.query("SELECT qa FROM users WHERE user_id IN (SELECT user_id FROM sessions WHERE session_id = ?", session_id, function(error, results, fields) {
      if (error) return -1;
      return (results[0].qa == 1);
    })
  }

  this.getUserIdFromSession = function(session_id) {
    c.query("SELECT user_id FROM sessions WHERE session_id = ?", session_id, function(error, results, fields) {
      if (error) return -1;
      if (results.length != 1) return -1;
      return results[0].user_id;
    })
  }

  // TODO: Implement
  // function getDailySummary(callback) {
  //   c.query("SELECT prid, date, tic, preceptor, flagged FROM qas WHERE reviewDate BETWEEN (NOW() - INTERVAL 1 DAY) AND NOW()", function (error, results, fields) {
  //     if (error) callback(-1);
  //     callback(results);
  //   });
  // }

  this.get_data = async function(query, params) {
    try {
      return new Promise(resolve => {
        c.query(query, params, (error, results, fields) => {
          console.log(results);
          resolve(results);
        });
      })
    } catch(error) {
      reject(-1);
    }
  }

  this.errorResponse = function(endpoint, code) {
    return {
      "code": code,
      "endpoint": endpoint,
      "message": "Incorrect data! Check the specification and try again."
    };
  }
}
