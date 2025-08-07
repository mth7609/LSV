const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
const serverFunctions = require('../lsv_modules/ServerFunctions');

const initData = require('../init.json');

parentPort.on('message', (message) => {
    doBackup();
});

function doBackup() {
    parentPort.postMessage('Backup start');

    setTimeout(function () {
        backup();
        parentPort.postMessage('Backup end');
    }, 2000);
}

function backup() {
    if (initData["backupAllow"] === "no")
        return;

    const backupDate = new Date();
    let destDir = initData["backupDir"] + backupDate.getFullYear() + "-" + (backupDate.getMonth() + 1) + "-" + backupDate.getDate() + '_dump.sql';

    if (destDir == serverFunctions.store.get("lastBackup")) {
        console.log("Database backup already done for today");
        return;
    }

    console.log("Last database backup stored in: " + destDir);

    let exec = require('child_process').exec;
    let cmd = 'mysqldump --host=localhost --port=3306 --default-character-set=utf8 --user=prolabor --password=mzkti29b# --protocol=tcp --skip-triggers "prolabor" > ' + destDir;

    exec(cmd, function (err, stdout, stderr) {
        if (err) throw err;
    });

    serverFunctions.store.put("lastBackup", destDir);
}




