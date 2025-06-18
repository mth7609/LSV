const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
const { app, BrowserWindow, Menu, shell, ipcMain, MessageChannelMain } = require('electron')
const electronLocalshortcut = require('electron-localshortcut');
const path = require('node:path')
const dbFunctions = require('./lsv_modules/ServerResponses');
const serverFunctions = require('./lsv_modules/ServerFunctions');
const initData = require('./init.json');
const EventEmitter = require('events')
const electron = require('electron');
const dialog = electron.dialog;
const child_process = require('child_process');

const loadingEvents = new EventEmitter();
let winMain = null;
let splashWindow = null;

var storage = require('node-storage');
var store = new storage('./storage');



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


  winMain.webContents.session.setSpellCheckerEnabled(false);
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

  winMain.webContents.setVisualZoomLevelLimits(1, 2);
  winMain.webContents.setZoomFactor(1.0);
  winMain.webContents.setZoomLevel(0);
  winMain.removeMenu();


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  // Add splash file and load index.html

  splashWindow = new BrowserWindow({
    width: 500,
    height: 450,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  });


  loadingEvents.on('finishedLogin', async () => {
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
    dbFunctions.databaseServerConnect();
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


  electronLocalshortcut.register('CommandOrControl+D', () => {
    winMain.webContents.toggleDevTools();
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

})

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


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function run_script(command, args, callback) {
  var child = child_process.spawn(command, args, {
    encoding: 'utf8',
    shell: true
  });
  // You can also use a variable to save the output for when the script closes later
  child.on('error', (error) => {
    dialog.showMessageBox({
      title: 'Title',
      type: 'warning',
      message: 'Error occured.\r\n' + error
    });
  });

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (data) => {
    //Here is the output
    data = data.toString();
    console.log(data);
  });


  child.on('close', (code) => {
    //Here you can get the exit code of the script  
    switch (code) {
      case 0:
        dialog.showMessageBox({
          title: 'Title',
          type: 'info',
          message: 'End process.\r\n'
        });
        break;
    }

  });
  if (typeof callback === 'function')
    callback();
}