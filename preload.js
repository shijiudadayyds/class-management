const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('classScore', {
  loadState: () => ipcRenderer.invoke('state:load'),
  saveState: (state) => ipcRenderer.invoke('state:save', state),
  listSafetySnapshots: () => ipcRenderer.invoke('safety:list'),
  createSafetySnapshot: (payload) => ipcRenderer.invoke('safety:create-snapshot', payload),
  importStudents: () => ipcRenderer.invoke('students:import'),
  importBackup: () => ipcRenderer.invoke('backup:import'),
  exportBackup: (payload) => ipcRenderer.invoke('backup:export', payload),
  exportSummary: (payload) => ipcRenderer.invoke('summary:export', payload),
  exportSummaryXlsx: (payload) => ipcRenderer.invoke('summary:export-xlsx', payload),
  updateWidgetState: (payload) => ipcRenderer.send('widget:update', payload),
  toggleMainWindow: () => ipcRenderer.send('widget:toggle-main'),
  showMainWindow: () => ipcRenderer.send('main:show'),
  startWidgetDrag: (screenX, screenY) => ipcRenderer.send('widget:drag-start', { screenX, screenY }),
  updateWidgetDrag: (screenX, screenY) => ipcRenderer.send('widget:drag-move', { screenX, screenY }),
  endWidgetDrag: () => ipcRenderer.send('widget:drag-end'),
  openWidgetMenu: () => ipcRenderer.send('widget:open-menu'),
  onWidgetState: (callback) => {
    const handler = (_event, payload) => callback(payload);
    ipcRenderer.on('widget:state', handler);
    return () => ipcRenderer.removeListener('widget:state', handler);
  }
});
