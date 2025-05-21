const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
const serverFunctions = require('./ServerFunctions');
const dbfunctions = require('./SQLQueries');
var storage = require('node-storage');
var store = new storage('./storage');


if (isMainThread) {
    const worker = new Worker(__filename);
    worker.on('message', (message) => {
        console.log(`Received from worker: ${message}`);
    });
    worker.postMessage("Start");
}
else {
    // Worker thread: Receive message from main thread
    parentPort.on('message', (message) => {
        //serverFunctions.checkDBLoop(0);
        serverFunctions.sleepSecs(0, 11);
        checkDBLoop(0);
    });
}


function checkDBLoop(callCnt) {
    let res;
    callCnt++;
    setTimeout(function () {
        res = checkSqlDBRunning();
        console.log("DB is: " + store.get('dbconnect'));
        checkDBLoop(callCnt);
    }, 1000);
};


function checkSqlDBRunning() {
    console.log("st " + dbfunctions.requestSqlDBStatus());
}

module.exports = { checkDBLoop };
