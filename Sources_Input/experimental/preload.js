const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  someFunction: (t) => ipcRenderer.send('CMD', t),
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD'),
  closeMainProcess: () => ipcRenderer.send('closeMainProcessCMD'),
  getHttpPort: (callback) => ipcRenderer.on('httpPort', (_event, value) => callback(value)),
  getStatus1: (callback) => ipcRenderer.on('status1', (_event, value) => callback(value)),
  getFrontPages: (callback) => ipcRenderer.on('frontPage', (_event, value) => callback(value)),

})
