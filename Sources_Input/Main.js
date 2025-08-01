const mysqldump = require('mysqldump');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');
const { app, BrowserWindow, Menu, ipcMain, MessageChannelMain } = require('electron');
const electronLocalshortcut = require('electron-localshortcut');
const path = require('node:path');
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
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  // Add splash file and load index.html

const createLoginWindow = () => {
  loginWindow = new BrowserWindow({
    width: 500,
    height: 450,
    frame: false,
    show: false,
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
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const createDbMessageWindow = () => {
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
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const createLoginErrorWindow = () => {
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
    //console.log("cancel");
    loginWindow.show();
    loginErrorWindow.hide();
  })
}

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



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ End createMainWindow()

const createWorkerThread = () => {
  if (isMainThread) {
    databaseCheckWorker = new Worker("./lsv_modules/DatabaseThread.js");
    databaseCheckWorker.postMessage("Start");

    databaseCheckWorker.on('message', (message) => {
      if (winMain)
        winMain.webContents.send('dbStatus', message);
      if (message === "NOK") {
        if (dbMessageWindow) {
          if (loginWindow) loginWindow.hide();
          if (loginErrorWindow) loginErrorWindow.hide();
          dbMessageWindow.show();
        }
      }
      else {
        if (dbMessageWindow) dbMessageWindow.hide();
        console.log("Database running");
      }
    });

    frontPagesWorker = new Worker("./lsv_modules/FrontPagesThread.js");
    frontPagesWorker.on('message', (message) => {
      console.log(message);
      if (winMain)
        winMain.webContents.send('frontPage', message);
    });
    frontPagesWorker.postMessage("Start");
  }
}


app.whenReady().then(() => {

  console.log("Starting application");

  serverFunctions.serverOpen();
  console.log("Local HTTP server started");
  app.commandLine.appendSwitch('high-dpi-support', 1)
  app.commandLine.appendSwitch('force-device-scale-factor', 1)

  setTimeout(() => {
    serverResponses.databaseServerConnect();
    console.log("Connected to database");
  }, 500);

  setTimeout(() => {
    createLoginWindow();
    console.log("Login window created");
  }, 1000);

  setTimeout(() => {
    createDbMessageWindow();
    console.log("DB message window created");
  }, 1500);

  setTimeout(() => {
    createLoginErrorWindow();
    console.log("Login error window created");
  }, 2000);

  setTimeout(() => {
    createMainWindow();
    console.log("Main window created");
    winMain.webContents.send('dbStatus', "checking...");
  }, 2500);

  setTimeout(() => {
    createWorkerThread();
    console.log("Threads started");
  }, 3000);

  setTimeout(() => {
    loginWindow.show();
    console.log("Login window running");
  }, 3500);

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
  }, 500);
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

  mysqldump({
    connection: {
      host: 'localhost',
      user: 'prolabor',
      password: 'mzkti29b#',
      database: 'prolabor',
    },
    dumpToFile: destDir
  });

  serverFunctions.store.put("lastBackup", destDir);
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// electron-packager . Archiv --overwrite --platform=win32 --arch=ia32 --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="ArchivDerJugendzeitschriften"
// Build EXE in C:\Projects\Electron\LSV\
// Result in c:\Projects\Electron\LSV\release-builds\

// Start/Stop MySQL in PowerShell: net start[stop] mySQL80 oder MySQL_Start.cmd / MySQL_Stop.cmd
// Daten in c:\Projects\Electron\LSV\MySQL-Data\