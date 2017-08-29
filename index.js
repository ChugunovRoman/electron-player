'use strict';
const remote = require('electron').remote;
const {
    electron,
    app,
    BrowserWindow,
    dialog,
    ipcMain
} = require('electron');

const fs = require('fs');

const path = require('path');
const url = require('url');

// need for the live-reload app
// require('electron-reload')(__dirname);

let win;

function createWindow() {

    win = new BrowserWindow({
        width: 500,
        height: 500,
        // resizable: false
    });

    ipcMain.on('sendOpenDlg', (event, props) => {
        console.log("Data received!");

        win.webContents.send('addTracks', dialog.showOpenDialog({
            'title': "Добавление файлов",
            'buttonLabel': "Добавить",
            properties: [
                'openFile',
                // 'openDirectory',
                'multiSelections'
            ]
        }));
    });


    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {

    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {

    if(win === null) {
        createWindow();
    }
});
