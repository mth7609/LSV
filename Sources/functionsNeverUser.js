

/*async function sleepSecs(callCnt, secs) {       // Template
    callCnt++;
    if (callCnt < secs) {
        setTimeout(function () {
            sleepSecs(callCnt, secs);
        }, 1000);
    } else
        parentPort.postMessage('Sleep for seconds: ' + secs);

};

async function runForeverSecs(callCnt) {        // Template
    callCnt++;
    parentPort.postMessage('Step forever: ' + callCnt);
    setTimeout(function () {
        runForeverSecs(callCnt);
    }, 1000);
};



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

*/