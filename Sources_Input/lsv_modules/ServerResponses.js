const serverFunctions = require('./ServerFunctions');
const EventEmitter = require('events');
var storage = require('node-storage');
var store = new storage('./storage.dat');
let tableNames = [];
let con;

const dsn = {
  host: 'localhost',
  database: "prolabor",
  user: 'prolabor',
  password: "mzkti29b#",
};


function databaseServerConnect() {
  con = serverFunctions.mysql.createConnection(dsn);

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


function responseDBStatus() {
  serverFunctions.appx.get('/requestDBStatus', (req, res) => {
    if (store.get("dbconnect") == "OK")
      res.send('command1');
    else
      res.send('command2');
  });
}


function responseDBRunning() {
  serverFunctions.appx.get('/requestDBRunning', (req, res) => {
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

function responseStates() {
  serverFunctions.appx.get('/requestStates', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT name FROM states", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}


function responseOutputText() {
  serverFunctions.appx.get('/requestOutputText', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM output_text", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}

function responseTopicHeadlines() {
  serverFunctions.appx.get('/requestTopicHeadlinesInfo', (req, res) => {
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

function responseTopHeadlines() {
  serverFunctions.appx.get('/requestDatasetTopHeadlines', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM dataset_top_headlines order by arraypos", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}


function responseInfoLabels() {
  serverFunctions.appx.get('/requestInfoLabels', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM info_labels", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}



function responseTopicItems() {
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


function responseImages() {
  serverFunctions.appx.get('/requestImages', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM images", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    });
  });
}


function responseConstValues() {
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


function responseInitValues() {
  serverFunctions.appx.get('/requestInitValues', (req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      let initData = require('../init.json');
      res.send(initData);
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


function responseCheckDatasetNumber() {
  let dsCon;
  serverFunctions.appx.get('/requestCheckDatasetNumber', (req, res) => {
    const dataset_number = req.query.datasetNumber;
    dsCon = serverFunctions.mysql.createConnection(dsn);
    dsCon.connect((err) => {
      if (err) throw err;
      dsCon.query("SELECT nr FROM prolabor.archive_data WHERE dataset_number=" + dataset_number, (err, result, fields) => {
        if (err) throw err;
        if (result.length == 0) {
          //console.log("dsNr: " + dataset_number + "           " + 0);
          res.send(Object(0));
          dsCon.end();
        }
        else {
          dsCon.query("SELECT nr FROM prolabor.dataset_comments WHERE dataset_number=" + dataset_number, (err, result, fields) => {
            //console.log("dsNr: " + dataset_number + "           " + 1);
            if (err) throw err;
            if (result.length == 1) {
              res.send(Object(1));
            } else {
              res.send(Object(0));
            }
            dsCon.end();
          });
        }
      });
    });
  });
}


function responseDataset() {
  let dsNr;
  serverFunctions.appx.get('/requestDataset', (req, res) => {
    const dataset_number = req.query.datasetNumber;
    dsNr = serverFunctions.mysql.createConnection(dsn);
    dsNr.connect((err) => {
      if (err) throw err;
      dsNr.query("SELECT * FROM archive_data where dataset_number=" + dataset_number, (err, result, fields) => {
        if (err) {
          throw err;
        }
        res.send(result);
      });
    });
  });
}


function executeSimpleSQL(sqlQuery) {
  //console.log(sqlQuery);
  let conSave = serverFunctions.mysql.createConnection(dsn);
  conSave.connect(function (err) {
    if (err) throw err;
    conSave.query(sqlQuery, function (err) {
      if (err) throw err;
    });
    conSave.end();
  });
}


function responseComment() {
  let dsNr;
  serverFunctions.appx.get('/requestComment', (req, res) => {
    const dataset_number = req.query.datasetNumber;
    //console.log("nr: " + dataset_number);
    dsNr = serverFunctions.mysql.createConnection(dsn);
    dsNr.connect((err) => {
      if (err) throw err;
      dsNr.query("SELECT * FROM dataset_comments where dataset_number=" + dataset_number, (err, result, fields) => {
        if (err) {
          throw err;
        }
        res.send(result);
      });
    });
  });
}

responseDBStatus();
responseStates();
responseTopicHeadlines();
responseTopHeadlines();
responseTopicItems();
responseOutputText();
responseInfoLabels();
responseDBRunning();
responseImages();
responseInitValues();
responseConstValues();
responseDataset();
responseCheckDatasetNumber();
responseComment();

module.exports = { responseCheckDatasetNumber, responseComment, executeSimpleSQL, responseDataset, responseInitValues, responseDBStatus, responseDBRunning, responseStates, databaseServerConnect, responseTopicHeadlines, responseTopHeadlines, responseOutputText, responseImages, responseConstValues, responseInfoLabels };
