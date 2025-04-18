const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD')
})