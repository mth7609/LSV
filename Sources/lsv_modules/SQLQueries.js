const serverFunctions = require('./ServerFunctions');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')

let tableNames = [];

function databaseServerConnect() {
  con = serverFunctions.mysql.createConnection({
    host: "localhost",
    user: "prolabor",
    password: "mzkti29b",
    database: "prolabor"
  });

  con.connect(function (err) {
    if (err) {
      dbConnect = false;
      console.log(dbConnect);
    }
    else {
      dbConnect = true;
      console.log(dbConnect);
    }
  });


}

function requestSqlDBStatus() {
  serverFunctions.appx.get('/requestSqlDBStatus', (req, res) => {
    if (dbConnect == true)
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

function requestSqlFrontPageFiles() {
  serverFunctions.appx.get('/requestSqlFrontPageFiles', (req, res) => {
    let result = serverFunctions.readFrontPageFiles();
    res.send(result);
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
requestSqlFrontPageFiles();
requestSqlDBRunning();
requestSqlImages();
requestInitValues();

module.exports = { requestInitValues, requestSqlDBStatus, requestSqlDBRunning, requestSqlStates, databaseServerConnect, requestSqlTopicHeadlines, requestSqlTopHeadlines, requestSqlOutputText, requestSqlImages, requestSqlInfoLabels, requestSqlFrontPageFiles };



