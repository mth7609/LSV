const serverFunctions = require('./ServerFunctions');
var storage = require('node-storage');
var store = new storage('./storage');
let tableNames = [];

function databaseServerConnect() {
  con = serverFunctions.mysql.createConnection({
    host: "localhost",
    user: "prolabor",
    password: "mzkti29b",
    database: "prolabor"
  });

  store.put("dbconnect", "NOK");
  con.connect(function (err) {
    if (err) {
      store.put("dbconnect", "NOK");
      //console.log("dbconnect " + store.get("dbconnect"));
    }
    else {
      store.put("dbconnect", "OK");
      //console.log("dbconnect " + store.get("dbconnect"));
    }
  });
}


function requestSqlDBStatus() {
  serverFunctions.appx.get('/requestSqlDBStatus', (req, res) => {
    if (store.get("dbconnect") == "OK")
      res.send('command1');
    else
      res.send('command2');
  });
}


function requestSqlDBRunning() {
  serverFunctions.appx.get('/requestSqlDBRunning', (req, res) => {
    con.connect(function (err) {
      con.query("SELECT name FROM states", function (err, result, fields) {
        if (err) {
          databaseServerConnect();
          res.send("command2");
        }
        else
          res.send("command1");
      });
    });
  });
}

function requestSqlStates() {
  serverFunctions.appx.get('/requestSqlStates', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT name FROM states", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}


function requestSqlOutputText() {
  serverFunctions.appx.get('/requestSqlOutputText', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM output_text", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}

function requestSqlTopicHeadlines() {
  serverFunctions.appx.get('/requestSqlTopicHeadlinesInfo', (req, res) => {
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

function requestSqlTopHeadlines() {
  serverFunctions.appx.get('/requestSqlTopHeadlines', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM top_headlines order by arraypos", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}


function requestSqlInfoLabels() {
  serverFunctions.appx.get('/requestSqlInfoLabels', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM info_labels", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}



function requestSqlTopicItems() {
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


function requestSqlImages() {
  serverFunctions.appx.get('/requestSqlImages', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM images", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}


function requestInitValues() {
  serverFunctions.appx.get('/requestInitValues', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      let initData = require('../init.json');
      res.send(initData);
    });
  });
}

requestSqlDBStatus();
requestSqlStates();
requestSqlTopicHeadlines();
requestSqlTopHeadlines();
requestSqlTopicItems();
requestSqlOutputText();
requestSqlInfoLabels();
requestSqlDBRunning();
requestSqlImages();
requestInitValues();

module.exports = { requestInitValues, requestSqlDBStatus, requestSqlDBRunning, requestSqlStates, databaseServerConnect, requestSqlTopicHeadlines, requestSqlTopHeadlines, requestSqlOutputText, requestSqlImages, requestSqlInfoLabels };
