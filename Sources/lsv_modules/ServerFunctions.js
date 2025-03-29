const express = require('express');
const appx = express();
const http = require('http');
const server = http.createServer(appx);
const { PowerShell } = require('node-powershell');

function serverClose() {
    server.closeAllConnections();
    server.close();
    if (server.listening)
        console.log('ERROR: HTTP server still running');
    else
        console.log('HTTP server stoppt');
}

function serverOpen() {
    server.listen(8080, () => {
        if(server.listening)
            console.log('HTTP Server listen on localhost:8080');
        else
        {
            console.log('ERROR: HTTP Server not listening on localhost:8080, trying again');
            setTimeout(() => {
                serverOpen();
            }, 3000);
            if (server.listening)
                console.log('HTTP Server listen on localhost:8080');
            else
            {
                console.log('ERROR: HTTP Server not listening on localhost:8080, Killed!');
                process.kill(process.pid, 'SIGINT'); 
            }
        }
    });
}

function startMySqlService() {
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

module.exports = { appx, serverClose, serverOpen, startMySqlService, stopMySqlService };
