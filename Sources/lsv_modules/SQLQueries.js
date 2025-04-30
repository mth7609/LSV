const serverFunctions = require('./ServerFunctions');

var mysql = require('mysql2');
var dbConnect = false;
var con;
var tableNames = [];

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

function getOutputText() {
  serverFunctions.appx.get('/getOutputText', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM output_text", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}

function getTopicHeadlines() {
  serverFunctions.appx.get('/getTopicHeadlinesInfo', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM topic_headlines order by headline_nr", function (err, result, fields) {
        if (err) throw err;
        tableNames = result;
        res.send(result);
      });
    });
  });
}

function getTopHeadlines() {
  serverFunctions.appx.get('/getTopHeadlines', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM top_headlines order by arraypos", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}


function getInfoLabels() {
  serverFunctions.appx.get('/getInfoLabels', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM info_labels", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}


function getTopicItems() {
  serverFunctions.appx.get('/0', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[0]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });

  serverFunctions.appx.get('/1', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[1]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });
  serverFunctions.appx.get('/2', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[2]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });
  serverFunctions.appx.get('/3', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[3]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });
  serverFunctions.appx.get('/4', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[4]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });
  serverFunctions.appx.get('/5', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[5]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });
  serverFunctions.appx.get('/6', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[6]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });
  serverFunctions.appx.get('/7', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[7]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });
  serverFunctions.appx.get('/8', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[8]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });
  serverFunctions.appx.get('/9', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[9]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });
  serverFunctions.appx.get('/10', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM " + tableNames[10]["tablename"], function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });
  });
}


getDBStatus();
getStates();
getTopicHeadlines();
getTopHeadlines();
getTopicItems();
getOutputText();
getInfoLabels();

module.exports = { getDBStatus, getStates, databaseServerConnect, getTopicHeadlines, getTopHeadlines, getOutputText, getInfoLabels };



