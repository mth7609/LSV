const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD'),
  closeMainProcess: () => ipcRenderer.send('closeMainProcessCMD'),
  getHttpPort: (callback) => ipcRenderer.on('httpPort', (_event, value) => callback(value)),
})

