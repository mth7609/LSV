const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openSearchProcess: (openSearchProcess) => ipcRenderer.send('openSearchProcessCMD', openSearchProcess)
})