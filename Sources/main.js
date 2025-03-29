const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const path = require('node:path')
const mysql = require('mysql2')
const dbFunctions = require('./lsv_modules/SQLQueries');
const serverFunctions = require('./lsv_modules/ServerFunctions');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  })
  var currentZoom = win.webContents.getZoomFactor();
  win.webContents.zoomFactor = currentZoom + 0.1;
  win.loadFile('index.html');
}


/*win.webContents.setZoomFactor(1.0);

// Upper Limit is working of 500 %
win.webContents
  .setVisualZoomLevelLimits(1, 5)
  .then(console.log("Zoom Levels Have been Set between 100% and 500%"))
  .catch((err) => console.log(err));

win.webContents.on("zoom-changed", (event, zoomDirection) => {
  console.log(zoomDirection);
  var currentZoom = win.webContents.getZoomFactor();
  console.log("Current Zoom Factor - ", currentZoom);
  // console.log('Current Zoom Level at - '
  // , win.webContents.getZoomLevel());
  console.log("Current Zoom Level at - ", win.webContents.zoomLevel);

  if (zoomDirection === "in") {

    // win.webContents.setZoomFactor(currentZoom + 0.20);
    win.webContents.zoomFactor = currentZoom + 0.2;

    console.log("Zoom Factor Increased to - "
      , win.webContents.zoomFactor * 100, "%");
  }
  if (zoomDirection === "out") {

    // win.webContents.setZoomFactor(currentZoom - 0.20);
    win.webContents.zoomFactor = currentZoom - 0.2;

    console.log("Zoom Factor Decreased to - "
      , win.webContents.zoomFactor * 100, "%");
  }
});

*/

/*
const menu = new Menu()
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))

Menu.setApplicationMenu(menu);
*/

const createDebugWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  })
  win.loadFile('debug.html');
}

app.whenReady().then(() => {
  serverFunctions.serverOpen();
  console.log("Local HTTP server started");

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
  }, 3000);

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
  }, 3000);

}
) // on


// electron-packager . Archiv --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets / icons / win / icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="ArchivDerJugendzeitschriften"
// Build EXE in C:\Projects\Electron\LSV\
// Result in c:\Projects\Electron\LSV\release-builds\

// Start/Stop MySQL in PowerShell: net start[stop] mySQL80 oder MySQL_Start.cmd / MySQL_Stop.cmd
// Daten in c:\Projects\Electron\LSV\MySQL-Data\
