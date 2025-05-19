const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD'),
  closeMainProcess: () => ipcRenderer.send('closeMainProcessCMD'),
  getHttpPort: (callback) => ipcRenderer.on('httpPort', (_event, value) => callback(value)),
  getStatus1: (callback) => ipcRenderer.on('status1', (_event, value) => callback(value)),
})
