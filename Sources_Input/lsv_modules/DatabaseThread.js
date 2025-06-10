const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
const mysql = require('mysql2');
var storage = require('node-storage');
var store = new storage('./storage');

parentPort.on('message', (message) => {
    parentPort.postMessage('Hello from the database worker thread!');
    checkDBLoop();
});

function checkDBLoop(i) {

    setTimeout(function () {
        con = mysql.createConnection({
            host: "localhost",
            user: "prolabor",
            password: "mzkti29b",
            database: "prolabor"
        });

        con.connect(function (err) {
            if (err) {
                store.put("dbconnect", "NOK");
                parentPort.postMessage('NOK');
            }
            else {
                store.put("dbconnect", "OK");
                parentPort.postMessage('OK');
            }
        });

        con.end();
        checkDBLoop();

    }, 3000);
};


module.exports = { checkDBLoop }

