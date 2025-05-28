const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
const { app, BrowserWindow, Menu, shell, ipcMain, MessageChannelMain } = require('electron')
const electronLocalshortcut = require('electron-localshortcut');
const path = require('node:path')
const dbFunctions = require('./lsv_modules/ServerResponses');
const serverFunctions = require('./lsv_modules/ServerFunctions');
const initData = require('./init.json');

let winSearch;


var storage = require('node-storage');
var store = new storage('./storage');

const createMainWindow = () => {              // Main window
  let winMain = new BrowserWindow({
    width: 1600,
    height: 950,
    "webPreferences": {
      "web-security": false,
      "nodeIntegration": true,
      "webviewTag": true,
      "contextIsolation": true,
      preload: path.join(__dirname, 'preload.js')
    },
  })

  store.put("dbconnect", "NOK");

  winMain.once('ready-to-show', () => {
    winMain.webContents.send('httpPort', initData["httpPort"]);
  })

  ipcMain.on('openSearchProcessCMD', (event) => {
    createSearchResultMainWindow();
  })

  ipcMain.on('closeSearchProcessCMD', (event) => {
    if (winSearch)
      winSearch.close();
  })


  ipcMain.on('closeMainProcessCMD', (event) => {
    if (winMain)
      winMain.close();
  })

  winMain.webContents.setVisualZoomLevelLimits(1, 2);
  winMain.webContents.setZoomFactor(1.0);
  winMain.webContents.setZoomLevel(0);
  winMain.removeMenu();


  setTimeout(function () {
    winMain.loadFile('./index.html');
  }, 1000);


  winMain.on('closed', () => {
    if (winSearch)
      winSearch.close();
    winMain = false;
    console.log(' ---- Bye Bye Main ---- ')
  });


  electronLocalshortcut.register('CommandOrControl+D', () => {
    winMain.webContents.toggleDevTools();
    winMain.webContents.send('update-counter', 100);
  })


  electronLocalshortcut.register('CommandOrControl+R', () => {
    winMain.reload();
  })


  winMain.webContents.on("zoom-changed", (event, zoomDirection) => {
    var currentZoom = winMain.webContents.getZoomFactor();
    if (zoomDirection === "in" && currentZoom < 1.2) {
      winMain.webContents.zoomFactor = currentZoom + 0.1;
    }

    if (zoomDirection === "out" && currentZoom > 0.6) {
      winMain.webContents.zoomFactor = currentZoom - 0.1;
    }
  });


  if (isMainThread) {
    const worker = new Worker("./lsv_modules/DatabaseThread.js");
    worker.on('message', (message) => {                   // receive from worker, send to renderer
      console.log(message);
      if (winMain)
        winMain.webContents.send('status1', message);
    });
    worker.postMessage("Start");
  }

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


const createSearchResultMainWindow = () => {
  if (!winSearch) {
    winSearch = new BrowserWindow(
      {
        width: 600,
        height: 800,
        "webPreferences": {
          "web-security": false,
          "webviewTag": true
        }
      }
    )

    winSearch.on('closed', () => {
      winSearch = null;
      console.log(' ---- Bye Bye Search ---- ')
    })

    winSearch.webContents.setVisualZoomLevelLimits(1, 2);
    winSearch.webContents.setZoomFactor(1.0);
    winSearch.webContents.setZoomLevel(0);
    winSearch.removeMenu();
    winSearch.loadFile('SearchItemsList.html');
    electronLocalshortcut.register('CommandOrControl+F', () => {
      winSearch.webContents.toggleDevTools();
    })
    winSearch.show();
    console.log(' ---- Hello Search ---- ')
  }
  else {
    winSearch.reload();
    winSearch.show();
  }
}


app.whenReady().then(() => {
  serverFunctions.serverOpen();
  console.log("Local HTTP server started");
  app.commandLine.appendSwitch('high-dpi-support', 1)
  app.commandLine.appendSwitch('force-device-scale-factor', 1)

  setTimeout(() => {
    dbFunctions.databaseServerConnect();
    console.log("Connected to database");
  }, 1000);

  setTimeout(() => {
    console.log("Starting application");
    createMainWindow();
  }, 2000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  })
})


app.on('window-all-closed', () => {
  setTimeout(() => {
    serverFunctions.serverClose();
  }, 1000);

  setTimeout(() => {
    if (process.platform !== 'darwin') {
      app.quit();
      console.log("The End");
    }
  }, 2000);


})







// electron-packager . Archiv --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets / icons /winMain / icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="ArchivDerJugendzeitschriften"
// Build EXE in C:\Projects\Electron\LSV\
// Result in c:\Projects\Electron\LSV\release-builds\

// Start/Stop MySQL in PowerShell: net start[stop] mySQL80 oder MySQL_Start.cmd / MySQL_Stop.cmd
// Daten in c:\Projects\Electron\LSV\MySQL-Data\
