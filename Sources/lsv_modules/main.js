const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

app.on('ready', createWindow)

function createWindow() {
    let win = new BrowserWindow({
        width: 1000,
        height: 600,
        "webPreferences": {
            "web-security": false,
            "webviewTag": true
        }
    })

    win.on('closed', () => {
        win = null
    })

    win.webContents.openDevTools()
    win.removeMenu();
    win.loadFile('index.html');
}