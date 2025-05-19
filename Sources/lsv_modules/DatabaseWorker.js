const { app, BrowserWindow, Menu } = require('electron')
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')



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
        //serverFunctions.sleepSecs(0, 11);
        checkDBLoop(0);
    });
}


function checkDBLoop(callCnt) {
    let res;
    callCnt++;
    setTimeout(function () {
        res = checkSqlDBRunning();
        console.log('Check DB forever: ' + callCnt + "   " + con);
        checkDBLoop(callCnt);
    }, 1000);
};

function checkSqlDBRunning() {
    if (dbConnect) {
        con.query("SELECT name FROM states", function (err, result, fields) {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                console.log(result);
                return true;
            }
        });
    }
    return false;
}
