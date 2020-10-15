const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');   
const path = require('path');
 
let mainWindow;
 
function createWindow() {
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        minHeight: 600,
        minWidth: 800,
        show: false
    });
    const startURL = 'http://localhost:3000';
 
    mainWindow.loadURL(startURL);
    mainWindow.setMenu(null)
    // mainWindow.webContents.openDevTools()
    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
app.on('ready', createWindow);