const express = require('express');
const appx = express();
const http = require('http');
const server = http.createServer(appx);               // a http server is always created on localhost
const { PowerShell } = require('node-powershell');
const initData = require('../init.json');
const mysql = require('mysql2');


function serverClose() {
    server.closeAllConnections();
    server.close();
    if (server.listening)
        console.log('ERROR: HTTP server still running');
    else
        console.log('HTTP server stoppt');
}


function serverOpen() {
    server.listen(initData["httpPort"], () => {
        if (server.listening)
            console.log('HTTP Server listen on ' + initData["httpHost"] + ':' + initData["httpPort"]);
        else {
            console.log('ERROR: HTTP Server not listening on ' + initData["httpHost"] + ':' + initData["httpPort"] + ', trying again');
            setTimeout(() => {
                serverOpen();
            }, 3000);
            if (server.listening)
                console.log('HTTP Server listen on ' + initData["httpHost"] + ':' + initData["httpPort"]);
            else {
                console.log('ERROR: HTTP Server not listening on ' + initData["httpHost"] + ':' + initData["httpPort"] + ', killed!');
                process.kill(process.pid, 'SIGINT');
            }
        }
    });
}


async function sleepSecs(callCnt, secs) {
    callCnt++;
    if (callCnt < secs) {
        setTimeout(function () {
            sleepSecs(callCnt, secs);
        }, 1000);
    } else
        console.log('Sleep for seconds: ' + secs);
};

async function runForeverSecs(callCnt) {
    callCnt++;
    console.log('Step forever: ' + callCnt);
    setTimeout(function () {
        // do something in the loop
        runForeverSecs(callCnt);
    }, 1000);
};



function readFrontPageFiles() {
    let i;
    let f = [];
    var fs = require('fs');
    var files = fs.readdirSync('../Sources/images/').filter(fn => fn.startsWith('front_page_'));
    return files;
}


module.exports = { appx, serverClose, serverOpen, readFrontPageFiles, sleepSecs, runForeverSecs, mysql };
