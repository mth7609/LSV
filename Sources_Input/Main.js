const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
const { app, BrowserWindow, Menu, ipcMain, MessageChannelMain } = require('electron')
const electronLocalshortcut = require('electron-localshortcut');
const path = require('node:path')
const serverResponses = require('./lsv_modules/ServerResponses');
const serverFunctions = require('./lsv_modules/ServerFunctions');
const initData = require('./init.json');
const EventEmitter = require('events')
const electron = require('electron');
const fs = require('fs');
const ipp = require("ipp");
const crypto = require('crypto')
var Printer = require('ipp-printer')
var PDFDocument = require('pdfkit');

const loadingEvents = new EventEmitter();
let winMain = null;
let loginWindow = null;
let loginErrorWindow = null;
let dbMessageWindow = null;
let databaseCheckWorker = null;
let frontPagesWorker = null;

serverFunctions.store.put("dbconnect", "NOK");
backup();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ createMainWindow()

const createMainWindow = () => {
  winMain = new BrowserWindow({
    width: 1600,
    height: 950,
    show: false,
    webPreferences: {
      "web-security": false,
      "nodeIntegration": true,
      "webviewTag": true,
      "contextIsolation": true,
      "preload": path.join(__dirname, 'preload.js')
    },
  })

  winMain.webContents.session.setSpellCheckerEnabled(false);
  serverFunctions.createDatasetFiles();

  ipcMain.on('loginCMD', (event, user, pwd, pwdSHA) => {
    if (pwd === "nok") {
      loginErrorWindow.close();
      loginWindow.close();
      quitAPP();
    }

    if (user == "loginErrorClose") {
      loginWindow.show();
      loginErrorWindow.hide();
      return;
    }

    //console.log(user + "    " + pwd + "    " + pwdSHA);
    let inputSHA = crypto.createHash('sha256').update(pwd).digest('hex');
    pwd = "";
    //console.log("InputSHA: " + inputSHA);
    if (inputSHA === pwdSHA)
      loadingEvents.emit('finishedLogin');
    else {
      loginWindow.hide();
      loginErrorWindow.show();
    }
  })


  winMain.once('ready-to-show', () => {
    winMain.webContents.send('httpPort', initData["httpPort"]);
    winMain.webContents.send('initDate', initData["initDate"]);
    //console.log("ready");
    winMain.show();
  })

  ipcMain.on('sendDatasetCMD', (event, query) => {
    serverResponses.executeSimpleSQL(query);
  })

  winMain.on('closed', (event, query) => {
    console.log("Threads terminated");
    databaseCheckWorker.terminate();
    frontPagesWorker.terminate();
    quitAPP();
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

  loginWindow = new BrowserWindow({
    width: 500,
    height: 450,
    frame: false,
    show: true,
    alwaysOnTop: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  loginWindow.loadFile('./login.html').then(() => {
    loginWindow.center();
  }).catch(error => {
    console.error('Error loading splash window:', error);
  });

  loginWindow.on('closed', () => {
    loginWindow.removeAllListeners()
    loginWindow = null;
  })

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  dbMessageWindow = new BrowserWindow({
    width: 500,
    height: 250,
    frame: false,
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  dbMessageWindow.loadFile('./DbMessageWindow.html').then(() => {
    dbMessageWindow.center();
  }).catch(error => {
    console.error('Error loading message window:', error);
  });


  dbMessageWindow.on('closed', () => {
    dbMessageWindow.removeAllListeners()
    dbMessageWindow = null;
  })

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  loginErrorWindow = new BrowserWindow({
    width: 500,
    height: 230,
    frame: false,
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  loginErrorWindow.loadFile('./loginErrorWindow.html').then(() => {
    loginErrorWindow.center();
  }).catch(error => {
    console.error('Error loading message window:', error);
  });

  loginErrorWindow.on('loginErrorCancel', () => {
    console.log("cancel");
    loginWindow.show();
    loginErrorWindow.hide();
  })

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  loadingEvents.on('finishedLogin', async () => {
    try {
      loginWindow.close();
      winMain.loadFile('./index.html');
      winMain.center();
    } catch (error) {
      console.error('Error loading index.html: ', error);
    }
  })

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

} // winMain

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ End createMainWindow()


if (isMainThread) {
  databaseCheckWorker = new Worker("./lsv_modules/DatabaseThread.js");
  databaseCheckWorker.on('message', (message) => {                   // receive from worker, send to renderer
    console.log(message);
    if (winMain)
      winMain.webContents.send('status1', message);
    if (message == "NOK") {
      if (dbMessageWindow) {
        if (loginWindow) loginWindow.hide();
        if (loginErrorWindow) loginErrorWindow.hide();
        dbMessageWindow.show();
      }
    }
    else {
      if (dbMessageWindow) dbMessageWindow.hide();
    }
  });
  databaseCheckWorker.postMessage("Start");
}


if (isMainThread) {
  frontPagesWorker = new Worker("./lsv_modules/FrontPagesThread.js");
  frontPagesWorker.on('message', (message) => {
    console.log(message);
    if (winMain)
      winMain.webContents.send('frontPage', message);
  });
  frontPagesWorker.postMessage("Start");
}


app.whenReady().then(() => {
  serverFunctions.serverOpen();
  console.log("Local HTTP server started");
  app.commandLine.appendSwitch('high-dpi-support', 1)
  app.commandLine.appendSwitch('force-device-scale-factor', 1)

  setTimeout(() => {
    serverResponses.databaseServerConnect();
    console.log("Connected to database");
  }, 500);

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
  console.log("Disconnect database");
  serverResponses.databaseServerClose();
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
  if (initData["backupAllow"] == "no")
    return;
  const srcDir = initData["dbSourceDir"];
  const backupDate = new Date();
  const destDir = initData["backupDir"] + "_" + backupDate.getFullYear() + "-" + (backupDate.getMonth() + 1) + "-" + backupDate.getDate();
  console.log("Last backup on: " + serverFunctions.store.get("lastBackup"))
  if (destDir != serverFunctions.store.get("lastBackup")) {
    fs.cp(srcDir, destDir, { recursive: true }, (err) => {
      if (err) throw err;
    });
    console.log("New backup to: " + destDir + ",  from source: " + srcDir);
  }
  serverFunctions.store.put("lastBackup", destDir);
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// electron-packager . Archiv --overwrite --platform=win32 --arch=ia32 --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="ArchivDerJugendzeitschriften"
// Build EXE in C:\Projects\Electron\LSV\
// Result in c:\Projects\Electron\LSV\release-builds\

// Start/Stop MySQL in PowerShell: net start[stop] mySQL80 oder MySQL_Start.cmd / MySQL_Stop.cmd
// Daten in c:\Projects\Electron\LSV\MySQL-Data\