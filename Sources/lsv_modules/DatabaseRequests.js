const serverFunctions = require('./ServerFunctions');

var mysql = require('mysql2');
var dbConnect = false;
var con;


function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function databaseServerConnect() {
  con = mysql.createConnection({
    host: "localhost",
    user: "prolabor",
    password: "mzkti29b",
    database: "prolabor"
  });

  con.connect(function (err) {
    if (err)
      dbConnect = false;
    else
      dbConnect = true;
  });
}

function getDBStatus() {
  serverFunctions.appx.get('/getDBStatus', (req, res) => {
    if (dbConnect == true)
      res.send('command1');
    else
      res.send('command2');
  });
}

function getStates() {
  serverFunctions.appx.get('/getStates', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT name FROM states", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });

  });
}


getDBStatus();
getStates();

module.exports = { add, subtract, getDBStatus, getStates, databaseServerConnect };



