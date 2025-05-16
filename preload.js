<<<<<<< HEAD:Sources/preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD'),
  closeMainProcess: () => ipcRenderer.send('closeMainProcessCMD'),
  getHttpPort: (callback) => ipcRenderer.on('httpPort', (_event, value) => callback(value)),
})

=======
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD'),
  closeMainProcess: () => ipcRenderer.send('closeMainProcessCMD'),
  getHttpPort: (callback) => ipcRenderer.on('httpPort', (_event, value) => callback(value)),
})

>>>>>>> bae23a2a82d33fe219e36e369406e9d7c7dae2f0:preload.js
