const { parentPort } = require('node:worker_threads')


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ worker_thread ipc

parentPort.on('message', (message) => {
    parentPort.postMessage('Hello from the front pages worker thread!');   // send to main
    frontPagesLoop(0);
});


function frontPagesLoop(i) {
    setTimeout(function () {
        parentPort.postMessage("i: " + i);
        frontPagesLoop(++i);
    }, 4000);
};

