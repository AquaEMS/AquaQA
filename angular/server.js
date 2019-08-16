const express = require("express");
const bodyParser = require("body-parser");
// const config = require('./server_conf');
const http = require("http");
const createError = require("http-errors");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
require("./routes/api")();
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const jsonParser = bodyParser.json();
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist/aqua")));
app.use("/", express.static(path.join(__dirname, "dist/aqua")));
app.use("/api", apirouter);

app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);

var sessionStore = new MySQLStore({}, dbconn);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;

// app.listen(3000, function() {
//   console.log('Aqua is running!');
// });
