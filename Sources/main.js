const { app, BrowserWindow, Menu, globalShortcut } = require('electron')
const path = require('node:path')
const mysql = require('mysql2')
const dbFunctions = require('./lsv_modules/SQLQueries');
const serverFunctions = require('./lsv_modules/ServerFunctions');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1500,
    height: 800,
  })
  win.loadFile('index.html');


  win.webContents.setVisualZoomLevelLimits(1, 2);
  win.webContents.setZoomFactor(1.0);
  win.webContents.setZoomLevel(0);

  win.webContents.on("zoom-changed", (event, zoomDirection) => {
    var currentZoom = win.webContents.getZoomFactor();
    if (zoomDirection === "in" && currentZoom < 1.2) {
      win.webContents.zoomFactor = currentZoom + 0.1;
    }

    if (zoomDirection === "out" && currentZoom > 0.6) {
      win.webContents.zoomFactor = currentZoom - 0.1;
    }
    //console.log('Current Zoom Level at - ', win.webContents.getZoomLevel());
    //console.log(win.webContents.getZoomFactor());
  });
}

app.whenReady().then(() => {
  serverFunctions.serverOpen();
  console.log("Local HTTP server started");
  app.commandLine.appendSwitch('high-dpi-support', 1)
  app.commandLine.appendSwitch('force-device-scale-factor', 1)
  //globalShortcut.register('CommandOrControl+Y', () => {
  // console.log("CTRL-Y");
  //})


  //setTimeout(() => {
  //  serverFunctions.startMySqlService();
  //console.log("Database service started");
  //}, 2000);

  setTimeout(() => {
    dbFunctions.databaseServerConnect();
    console.log("Connected to database");
  }, 1000);

  setTimeout(() => {
    console.log("Starting application");
    createWindow();
  }, 2000);

  app.on('activate', () => {
    console.log("5");
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
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
) // on

m = Menu.getApplicationMenu();





// electron-packager . Archiv --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets / icons / win / icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="ArchivDerJugendzeitschriften"
// Build EXE in C:\Projects\Electron\LSV\
// Result in c:\Projects\Electron\LSV\release-builds\

// Start/Stop MySQL in PowerShell: net start[stop] mySQL80 oder MySQL_Start.cmd / MySQL_Stop.cmd
// Daten in c:\Projects\Electron\LSV\MySQL-Data\
