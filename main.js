const { app, BrowserWindow } = require('electron')
const path = require('node:path')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  })
  win.loadFile('index.html');
}

const createDebugWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  })
  win.loadFile('debug.html');
}

app.whenReady().then(() => {
  createWindow();
  //createDebugWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      //createDebugWindow();
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

)

// Build EXE in C:\Projects\Electron\LSV>
// electron - packager.Archiv--overwrite--asar = true --platform = win32--arch = ia32--icon = assets / icons / win / icon.ico--prune = true --out = release - builds--version - string.CompanyName=CE--version - string.FileDescription=CE--version - string.ProductName="Archive"
// Result in c:\Projects\Electron\LSV\release-builds\