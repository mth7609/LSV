const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron')
const electronLocalshortcut = require('electron-localshortcut');
const path = require('node:path')
const mysql = require('mysql2')
const dbFunctions = require('./lsv_modules/SQLQueries');
const serverFunctions = require('./lsv_modules/ServerFunctions');
let winSearch;

const createMainWindow = () => {
  var win = new BrowserWindow({
    width: 1500,
    height: 900,
    "webPreferences": {
      "web-security": false,
      "webviewTag": true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('openSearchProcessCMD', (event) => {
    //const webContents = event.sender;
    //const win2 = BrowserWindow.fromWebContents(webContents);
    //win2.setTitle(title);
    createSearchResultMainWindow();
    //setParentWindow(win);
  })

  win.webContents.setVisualZoomLevelLimits(1, 2);
  win.webContents.setZoomFactor(1.0);
  win.webContents.setZoomLevel(0);
  win.removeMenu();
  win.loadFile('index.html');

  electronLocalshortcut.register('CommandOrControl+D', () => {
    win.webContents.toggleDevTools();
  })

  electronLocalshortcut.register('CommandOrControl+R', () => {
    win.reload();
  })

  win.webContents.on("zoom-changed", (event, zoomDirection) => {
    var currentZoom = win.webContents.getZoomFactor();
    if (zoomDirection === "in" && currentZoom < 1.2) {
      win.webContents.zoomFactor = currentZoom + 0.1;
    }

    if (zoomDirection === "out" && currentZoom > 0.6) {
      win.webContents.zoomFactor = currentZoom - 0.1;
    }
  });
}






const createSearchResultMainWindow = () => {
  if (!winSearch) {

    winSearch = new BrowserWindow(
      {
        width: 600,
        height: 700,
        "webPreferences": {
          "web-security": false,
          "webviewTag": true
        }
      }
    )

    winSearch.on('closed', () => {
      winSearch = null;
      console.log(' ---- Bye Bye Search ---- ')
    });


    winSearch.webContents.setVisualZoomLevelLimits(1, 2);
    winSearch.webContents.setZoomFactor(1.0);
    winSearch.webContents.setZoomLevel(0);
    //winSearch.removeMenu();
    winSearch.loadFile('SearchItemsList.html');
    electronLocalshortcut.register('CommandOrControl+F', () => {
      winSearch.webContents.toggleDevTools();
    })
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

  //serverFunctions.stopMySqlService();
  //console.log('');
  //console.log('Database service stopped');

  setTimeout(() => {
    serverFunctions.serverClose();
  }, 1000);

  setTimeout(() => {
    if (process.platform !== 'darwin') {
      app.quit();
      console.log("The End");
    }
  }, 2000);


}
)



// electron-packager . Archiv --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets / icons / win / icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="ArchivDerJugendzeitschriften"
// Build EXE in C:\Projects\Electron\LSV\
// Result in c:\Projects\Electron\LSV\release-builds\

// Start/Stop MySQL in PowerShell: net start[stop] mySQL80 oder MySQL_Start.cmd / MySQL_Stop.cmd
// Daten in c:\Projects\Electron\LSV\MySQL-Data\
