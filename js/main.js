const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
let loadingWindow;

function createLoadingWindow() {
    loadingWindow = new BrowserWindow({
        width: 500,
        height: 600,
        icon: __dirname + '/../img/logo.png',
        frame: false
    });

    loadingWindow.loadURL(`file://${__dirname}/../loading.html`);

    loadingWindow.on('closed', () => {
        loadingWindow = null;
    });

    setTimeout(() => {
        createWindow();
        loadingWindow.close();
    }, 5000)
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: __dirname + '/../img/logo.png'
    });

    mainWindow.loadURL(`file://${__dirname}/../index.html`);

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createLoadingWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
})