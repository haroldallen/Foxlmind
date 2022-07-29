      
ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (e, args) => {
  console.log('Found version ' + args.version);
});

const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const restartAppButton = document.getElementById('notificationRestartApp');

ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  notificationMessage.innerText = 'A new update is available. Downloading now...';
  notification.classList.remove('hidden');
});

ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  notificationMessage.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
  restartAppButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});

function closeNotification() {
  notification.classList.add('hidden');
}

function restartApp() {
  ipcRenderer.send('restart_app');
}