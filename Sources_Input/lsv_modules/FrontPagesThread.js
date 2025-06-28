const { Worker, parentPort, workerData } = require('node:worker_threads')
const serverFunctions = require('./ServerFunctions');


let img = serverFunctions.readFrontPageFiles();


parentPort.on('message', (message) => {
    parentPort.postMessage('Hello from the front pages worker thread!');
    frontPagesLoop(0);
});


function frontPagesLoop(i) {

    setTimeout(function () {
        parentPort.postMessage(img[i]);
        if ((i++) >= img.length - 1)
            i = 0;
        frontPagesLoop(i);
    }, 4000);
};


module.exports = { frontPagesLoop }

