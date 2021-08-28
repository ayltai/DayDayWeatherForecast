'use strict';

const { app, ipcMain, nativeImage, nativeTheme, screen, } = require('electron');

const path = require('path');

const handleError = console.error;

const WINDOW_WIDTH  = 320;
const WINDOW_HEIGHT = 544;

global.IS_DARK_MODE = nativeTheme.shouldUseDarkColors;
global.APP_DIR      = app.getAppPath();

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

app.commandLine.appendSwitch('disable-web-security');

app.whenReady().then(() => {
    if (!app.isPackaged) {
        const { default : installExtension, REACT_DEVELOPER_TOOLS, } = require('electron-devtools-installer');

        installExtension(REACT_DEVELOPER_TOOLS).catch(handleError);
    }

    const menubar = require('menubar').menubar({
        index               : app.isPackaged ? require('url').format({
            pathname : path.join(__dirname, 'index.html'),
            protocol : 'file',
            slashes  : true,
        }) : `http://localhost:${process.env.PORT || 3000}`,
        icon                : path.join(__dirname, 'img', 'menubarTemplate.png'),
        preloadWindow       : true,
        showOnAllWorkspaces : false,
        showDockIcon        : false,
        browserWindow       : {
            width          : WINDOW_WIDTH,
            height         : WINDOW_HEIGHT,
            resizable      : false,
            skipTaskbar    : true,
            webPreferences : {
                allowRunningInsecureContent : true,
                contextIsolation            : false,
                enableRemoteModule          : true,
                nodeIntegration             : true,
                webSecurity                 : false,
            },
        },
    });

    if (!app.isPackaged) menubar.on('ready', () => menubar.window.webContents.openDevTools({
        mode : 'detach',
    }));

    if (process.platform === 'darwin') app.dock.hide();

    ipcMain.on('refresh', (event, data) => {
        const icon = path.join(app.getPath('temp'), Math.max(...screen.getAllDisplays().map(display => display.scaleFactor)) > 1 ? 'icon@2x.png' : 'icon.png');

        require('fs').writeFile(icon, nativeImage.createFromDataURL(data.icon).toPNG(), 'binary', error => {
            if (error) {
                handleError(error);
            } else {
                menubar.tray.setImage(nativeImage.createFromPath(icon));
            }
        });

        if (process.platform === 'darwin') menubar.tray.setTitle(data.temperature);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
