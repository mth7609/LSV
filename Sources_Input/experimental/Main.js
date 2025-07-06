const { Worker, isMainThread } = require('node:worker_threads')
const { app, BrowserWindow, Menu, shell, ipcMain, MessageChannelMain } = require('electron')

const path = require('node:path')


const createMainWindow = () => {              // Main window
  let winMain = new BrowserWindow({
    width: 500,
    height: 550,
    "webPreferences": {
      "web-security": false,
      "nodeIntegration": true,
      "webviewTag": true,
      "contextIsolation": true,
      imageAnimationPolicy: 'animate',
      preload: path.join(__dirname, 'preload.js')
    },
  })

  winMain.once('ready-to-show', () => {
    //winMain.webContents.send('httpPort', initData["httpPort"]);
  })


  setTimeout(function () {
    winMain.loadFile('./login.html');
  }, 1000);


  winMain.on('closed', () => {
    winMain = false;
    console.log(' ---- Bye Bye Main ---- ')
  });


  if (isMainThread) {
    const worker = new Worker("./lsv_modules/FrontPagesThread.js");
    worker.on('message', (message) => {                     // receive from worker, send to renderer
      console.log(message);
      if (winMain)
        winMain.webContents.send('frontPage', message);
    });
    worker.postMessage("Start");
  }
}





app.whenReady().then(() => {
  console.log("Local HTTP server started");
  app.commandLine.appendSwitch('high-dpi-support', 1)
  app.commandLine.appendSwitch('force-device-scale-factor', 1)


  setTimeout(() => {
    console.log("Starting application");
    createMainWindow();
  }, 2000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  })

  app.on('window-all-closed', () => {
    setTimeout(() => {
      if (process.platform !== 'darwin') {
        app.quit();
        console.log("The End");
      }
    }, 2000);
  })
})




