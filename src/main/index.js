const url = require('url');
const path = require('path');
const fs = require('fs');
const mm = require('musicmetadata');
const {
    app,
    BrowserWindow,
    dialog,
    ipcMain
} = require('electron');

let win;

function createWindow() {

    win = new BrowserWindow({
        width: 1000,
        height: 700
        // resizable: false
    });

    // get message from renderer process
    // ipcMain.on('sendOpenDlg', (event, props) => {
    //     console.log("Data received!");

    //     win.webContents.send('addTracks', dialog.showOpenDialog({
    //         'title': "Добавление файлов",
    //         'buttonLabel': "Добавить",
    //         properties: [
    //             'openFile',
    //             // 'openDirectory',
    //             'multiSelections'
    //         ]
    //     }));
    // });


    // let html = `<!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //         <title>LimBo Player</title>
    //     </head>
    //     <body>
    //         <h1>Hello world!!</h1>
    //         <span>Same text</span>

    //         <script>
    //             console.log(window);
    //             let s = document.createElement('script');
    //             s.setAttribute('src', '/assets/js/bundle.js');

    //             document.body.appendChild(s);
    //         </script>
    //     </body>
    //     </html>
    // `;

    // win.loadURL(`data:text/html;charset=utf-8,${html}`);

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../render/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.webContents.openDevTools();

    // Getting ID3 metadata
    mm(fs.createReadStream('/home/ruut/MyDisk/Music/Dubtek_-_Rampant.mp3'), (err, meta) => {
        if (err) {
            throw err;
        }

        console.log(meta);
    });

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
