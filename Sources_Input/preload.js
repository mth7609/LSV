const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  closeLogin: (user, pwd, pwdSHA, policy) => ipcRenderer.send("loginCMD", user, pwd, pwdSHA, policy),
  closeLoginErrorWindow: () => ipcRenderer.send("closeLoginErrorWindowCMD"),
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD'),
  closeMainProcess: () => ipcRenderer.send('closeMainProcessCMD'),
  executeSimpleSQL: (dataset) => ipcRenderer.send('executeSimpleSQLCMD', dataset),
  getHttpPort: (callback) => ipcRenderer.on('httpPort', (_event, value) => callback(value)),
  getLoginUser: (callback) => ipcRenderer.on('loginUser', (_event, value) => callback(value)),
  getUserPolicy: (callback) => ipcRenderer.on('userPolicy', (_event, value) => callback(value)),
  getInitDate: (callback) => ipcRenderer.on('initDate', (_event, value) => callback(value)),
  getDbStatus: (callback) => ipcRenderer.on('dbStatus', (_event, value) => callback(value)),
  getMessage: (callback) => ipcRenderer.on('message', (_event, value) => callback(value)),
  getFrontPages: (callback) => ipcRenderer.on('frontPage', (_event, value) => callback(value)),
  getDataset: (callback) => ipcRenderer.on('requestedDataset', (_event, value) => callback(value)),
})

