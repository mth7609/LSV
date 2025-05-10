const express = require('express');
const appx = express();
const http = require('http');
const server = http.createServer(appx);               // a http server is always created on localhost
const { PowerShell } = require('node-powershell');
const initData = require('../init.json');

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

/*function startMySqlService() {
    const poshInstance = async () => {
        const ps = new PowerShell({
            executionPolicy: 'Default',
            noProfile: true
        })

        const command = PowerShell.command`net start mySQL80`;
        const output = await ps.invoke(command);
        ps.dispose();
    }

    (async () => {
        poshInstance()
    })();
}

function stopMySqlService() {
    const poshInstance = async () => {
        const ps = new PowerShell({
            executionPolicy: 'Default',
            noProfile: true
        })

        const command = PowerShell.command`net stop mySQL80`;
        const output = await ps.invoke(command);
        ps.dispose();
    }

    (async () => {
        poshInstance()
    })();
}

*/

function readFrontPageFiles() {
    let i;
    let f = [];
    var fs = require('fs');
    var files = fs.readdirSync('../Sources/images/').filter(fn => fn.startsWith('front_page_'));
    return files;
}

module.exports = { appx, serverClose, serverOpen, readFrontPageFiles };
