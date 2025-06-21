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
  return con;
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
  serverFunctions.appx.get('/requestSqlDatasetTopHeadlines', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM dataset_top_headlines order by arraypos", function (err, result, fields) {
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


function requestConstValues() {
  serverFunctions.appx.get('/requestConstants', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM constants", function (err, result, fields) {
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


function requestSelectDatasetNumber(dataset_number) {
  serverFunctions.appx.get('/requestSelectDatasetNumber', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM dataset_numbers where dataset_number=" + dataset_number, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}

function ObjectLength(object) {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
};

function requestNewDatasetNumber() {
  let maxV;
  let dsNr;

  serverFunctions.appx.get('/requestNewDatasetNumber', (req, res) => {
    dsNr = serverFunctions.mysql.createConnection({
      host: "localhost",
      user: "prolabor",
      password: "mzkti29b",
      database: "prolabor"
    });

    dsNr.connect((err) => {
      if (err) throw err;
      dsNr.query("SELECT dataset_number FROM prolabor.archive_data order by dataset_number", (err, result, fields) => {
        if (err) {
          res.send(new Object(0));
          throw err;
        }
        let len = ObjectLength(result);
        maxV = 0;
        for (let i = 0; i < len; i++) {
          if (result[i]["dataset_number"] > maxV) {
            maxV = result[i]["dataset_number"];
          }
        }
        dsNr.end();
        maxV++;
        //console.log("Result: " + maxV);
        res.send(new Object(maxV));
      });
    });
  });
}


function saveDataset(sqlQuery) {
  let conSave = serverFunctions.mysql.createConnection({
    host: "localhost",
    user: "prolabor",
    password: "mzkti29b",
    database: "prolabor"
  });

  conSave.connect(function (err) {
    if (err) throw err;
    conSave.query(sqlQuery, function (err) {
      if (err) throw err;
    });

    conSave.end();
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
requestConstValues();
requestSelectDatasetNumber();
requestNewDatasetNumber();

module.exports = { saveDataset, requestNewDatasetNumber, requestSelectDatasetNumber, requestInitValues, requestSqlDBStatus, requestSqlDBRunning, requestSqlStates, databaseServerConnect, requestSqlTopicHeadlines, requestSqlTopHeadlines, requestSqlOutputText, requestSqlImages, requestConstValues, requestSqlInfoLabels };
