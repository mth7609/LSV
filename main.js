const { app, BrowserWindow} = require('electron')
const path = require('node:path')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  })
  win.loadFile('index.html');
  }

  const createDebug = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  })
win.webContents.openDevTools();
  win.loadFile('debug.html');
  }
app.whenReady().then(() => {
  createWindow();
  //createDebug();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

)
