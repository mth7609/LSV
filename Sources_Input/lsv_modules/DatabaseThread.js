const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
const mysql = require('mysql2');

parentPort.on('message', (message) => {
    checkDBLoop();
});

//parentPort.postMessage('OK');

function checkDBLoop(i) {

    setTimeout(function () {
        con = mysql.createConnection({
            host: "localhost",
            user: "prolabor",
            password: "mzkti29b#",
            database: "prolabor"
        });

        con.connect(function (err) {
            if (err) {
                parentPort.postMessage('NOK');
            }
            else {
                parentPort.postMessage('OK');
            }
        });

        con.end();
        checkDBLoop();

    }, 10000);
};


module.exports = { checkDBLoop }

