const { app, BrowserWindow, ipcMain, webContents } = require('electron');
require('@electron/remote/main').initialize();
const path = require('path');
const { autoUpdater } = require("electron-updater");
const os = require('os');
const storage = require('electron-json-storage');
let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  storage.setDataPath(os.homedir+"/foxlmind");
  console.log(storage.getDataPath());
  console.log(storage.getDefaultDataPath());
  console.log(os.homedir+"/foxlmind");

  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 980,
    minHeight: 580,
    width: 980,
    height: 580,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '/assets/media/logo.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // and load the index.html of the app.
  mainWindow.setBackgroundColor('rgb(228,228,228)');
  mainWindow.loadFile(path.join(__dirname, 'redesign.html'));

  mainWindow.on('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  require('@electron/remote/main').enable(mainWindow.webContents);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// Electron auto updater
// Sends version to IPC
ipcMain.on('app_version', (e) => {
  e.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('json_path', (e) => {
  e.sender.send('json_path', { path: storage.getDataPath() });
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on('reloadWindow', (e) => {
  mainWindow.reload();
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});
module.exports.mainWindow = mainWindow;