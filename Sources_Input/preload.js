const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  closeLogin: (username, credential) => ipcRenderer.send("loginCMD", username, credential),
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD'),
  closeMainProcess: () => ipcRenderer.send('closeMainProcessCMD'),
  receiveDataset: (dataset) => ipcRenderer.send('receiveDatasetCMD', dataset),
  getHttpPort: (callback) => ipcRenderer.on('httpPort', (_event, value) => callback(value)),
  getStatus1: (callback) => ipcRenderer.on('status1', (_event, value) => callback(value)),
  getFrontPages: (callback) => ipcRenderer.on('frontPage', (_event, value) => callback(value)),

})
