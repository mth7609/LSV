const serverFunctions = require('./ServerFunctions');

var mysql = require('mysql2');
var dbConnect = false;
var con;


function databaseServerConnect() {
  con = mysql.createConnection({
    host: localStorage.getItem("mysqlHost"),
    user: localStorage.getItem("mysqlUser"),
    password: localStorage.getItem("mysqlPassword"),
    database: localStorage.getItem("mysqlDatabase")
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


getDBStatus();
getStates();

module.exports = { add, subtract, getDBStatus, getStates, databaseServerConnect };



