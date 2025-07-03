const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
const { app, BrowserWindow, Menu, shell, ipcMain, MessageChannelMain } = require('electron')
const electronLocalshortcut = require('electron-localshortcut');
const path = require('node:path')
const serverResponses = require('./lsv_modules/ServerResponses');
const serverFunctions = require('./lsv_modules/ServerFunctions');
const initData = require('./init.json');
const EventEmitter = require('events')
const electron = require('electron');
const dialog = electron.dialog;
const child_process = require('child_process');
const fs = require('fs');

const loadingEvents = new EventEmitter();
let winMain = null;
let splashWindow = null;

var storage = require('node-storage');
var store = new storage('./storage');

backup();


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ createMainWindow()

const createMainWindow = () => {
  winMain = new BrowserWindow({
    width: 1600,
    height: 950,
    show: false,
    "webPreferences": {
      "web-security": false,
      "nodeIntegration": true,
      "webviewTag": true,
      "contextIsolation": true,
      preload: path.join(__dirname, 'preload.js')
    },
  })

  // winMain.webContents.session.setSpellCheckerEnabled(false);
  store.put("dbconnect", "NOK");
  serverFunctions.createDatasetFiles();

  ipcMain.on('loginCMD', (event, username, credential) => {
    //console.log(username + "    " + credential);
    if (credential == "ok")
      loadingEvents.emit('finishedLogin');
    else
      quitAPP();
  })

  winMain.once('ready-to-show', () => {
    winMain.webContents.send('httpPort', initData["httpPort"]);
  })

  ipcMain.on('sendDatasetCMD', (event, query) => {
    serverResponses.executeSimpleSQL(query);
  })

  winMain.webContents.on("focus", (event, zoomDirection) => {
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

  electronLocalshortcut.register('CommandOrControl+D', () => {
    winMain.webContents.toggleDevTools();
  })

  electronLocalshortcut.register('CommandOrControl+R', () => {
    winMain.reload();
  })

  winMain.removeMenu();


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  // Add splash file and load index.html


  /*  winMain.loadFile('./index.html');                       // +++++++++++++++ Without login
    winMain.center();
    setTimeout(() => {
      winMain.show();
    }, 1000);
  */

  splashWindow = new BrowserWindow({                   // +++++++++++++++ Uncomment when login or not
    width: 500,
    height: 450,
    frame: false,
    //show: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  });



  loadingEvents.on('finishedLogin', async () => {         // +++++++++++++++ Uncomment when login
    try {
      splashWindow.close();
      await winMain.loadFile('./index.html');
      winMain.center();
      setTimeout(() => {
        winMain.show();
      }, 1000);


    } catch (error) {
      console.error('Error loading index.html: ', error);
    }
  })


  // Load splash screen file
  splashWindow.loadFile('./login.html').then(() => {
    splashWindow.center();
  }).catch(error => {
    console.error('Error loading splash window:', error);
  });

  // Clean up ressources when splash window is closed
  splashWindow.on('closed', () => {
    splashWindow.removeAllListeners()
    splashWindow = null;
  })
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ End createMainWindow(), start 


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

app.whenReady().then(() => {
  serverFunctions.serverOpen();
  console.log("Local HTTP server started");
  app.commandLine.appendSwitch('high-dpi-support', 1)
  app.commandLine.appendSwitch('force-device-scale-factor', 1)

  //run_script("xcopy ..\MySql-Data ..\MySql-Data_copy /s /y", null, null);

  setTimeout(() => {
    serverResponses.databaseServerConnect();
    console.log("Connected to database");
  }, 1000);

  setTimeout(() => {
    console.log("Starting application");
    createMainWindow();
  }, 1500);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  })

  app.on('quit', () => {
    quitAPP;
  })
});

function quitAPP() {
  setTimeout(() => {
    serverFunctions.serverClose();
  }, 500);
  setTimeout(() => {
    if (process.platform !== 'darwin') {
      winMain.removeAllListeners()
      winMain = null;
      app.quit();
      console.log("The End");
    }
  }, 1500);
}

function backup() {
  const srcDir = "../MySql-Data";
  const backupDate = new Date();
  const destDir = initData["backupDir"] + "_" + backupDate.getFullYear() + "-" + (backupDate.getMonth() + 1) + "-" + backupDate.getDate();
  if (destDir != store.get("lastBackup")) {
    console.log("New Backup: " + destDir);
    fs.cp(srcDir, destDir, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
  store.put("lastBackup", destDir);
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// electron-packager . Archiv --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets / icons /winMain / icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="ArchivDerJugendzeitschriften"
// Build EXE in C:\Projects\Electron\LSV\
// Result in c:\Projects\Electron\LSV\release-builds\

// Start/Stop MySQL in PowerShell: net start[stop] mySQL80 oder MySQL_Start.cmd / MySQL_Stop.cmd
// Daten in c:\Projects\Electron\LSV\MySQL-Data\