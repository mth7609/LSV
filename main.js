const { app, BrowserWindow} = require('electron')
const path = require('node:path')



const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 600,
  })

  win.setBackgroundColor('#ff00a3');
  win.loadFile('index.html');


  const win2 = new BrowserWindow({
    width: 1024,
    height: 600,
  })

  win2.loadFile('debug.html');
}

app.whenReady().then(() => {
  createWindow()

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
})
