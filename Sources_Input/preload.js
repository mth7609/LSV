const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  closeLogin: (username, credential) => ipcRenderer.send("loginCMD", username, credential),
  closeMessageWindow: () => ipcRenderer.send("closeMessageWindowCMD"),
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD'),
  closeMainProcess: () => ipcRenderer.send('closeMainProcessCMD'),
  sendDataset: (dataset) => ipcRenderer.send('sendDatasetCMD', dataset),
  getHttpPort: (callback) => ipcRenderer.on('httpPort', (_event, value) => callback(value)),
  getStatus1: (callback) => ipcRenderer.on('status1', (_event, value) => callback(value)),
  getMessage: (callback) => ipcRenderer.on('message', (_event, value) => callback(value)),
  getFrontPages: (callback) => ipcRenderer.on('frontPage', (_event, value) => callback(value)),
  getDataset: (callback) => ipcRenderer.on('requestedDataset', (_event, value) => callback(value)),

})

