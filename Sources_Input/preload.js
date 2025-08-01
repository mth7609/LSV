const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  closeLogin: (user, pwd, pwdSHA) => ipcRenderer.send("loginCMD", user, pwd, pwdSHA),
  closeLoginErrorWindow: () => ipcRenderer.send("closeLoginErrorWindowCMD"),
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD'),
  closeMainProcess: () => ipcRenderer.send('closeMainProcessCMD'),
  sendDataset: (dataset) => ipcRenderer.send('sendDatasetCMD', dataset),
  getHttpPort: (callback) => ipcRenderer.on('httpPort', (_event, value) => callback(value)),
  getInitDate: (callback) => ipcRenderer.on('initDate', (_event, value) => callback(value)),
  getDbStatus: (callback) => ipcRenderer.on('dbStatus', (_event, value) => callback(value)),
  getMessage: (callback) => ipcRenderer.on('message', (_event, value) => callback(value)),
  getFrontPages: (callback) => ipcRenderer.on('frontPage', (_event, value) => callback(value)),
  getDataset: (callback) => ipcRenderer.on('requestedDataset', (_event, value) => callback(value)),

})

