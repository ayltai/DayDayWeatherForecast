import i18next from 'i18next';
import moment from 'moment';

import { Constants, } from '../Constants';
import { handleError, } from './ErrorHelpers';
import { WebClient, } from './WebClient';

let electron;
let url;

try {
    electron = window.require('electron');
    url      = window.require('url');
} catch (error) {
    try {
        electron = require('electron');
        url      = require('url');
    } catch (e) {
        electron = {
            ipcRenderer : {
                send : () => {},
            },
            remote      : {
                app              : {
                    quit                 : () => process.exit(),
                    getPath              : () => __filename,
                    setLoginItemSettings : () => {},
                },
                getCurrentWindow : () => ({
                    webContents : {
                        toggleDevTools : () => {},
                    },
                    reload      : () => {},
                }),
                getGlobal        : key => {
                    if (key === 'APP_DIR') return __dirname;
                    if (key === 'IS_DARK_MODE') return false;
                },
                shell            : {
                    openExternal : () => {},
                },
            },
        };

        url = {
            format : options => `${options.protocol}://${options.pathname}`,
        };
    }
}

export const AppHelpers = {};

AppHelpers.getGlobal = category => electron.remote.getGlobal(category);

AppHelpers.setAutoLaunch = enabled => {
    const app = electron.remote.app;

    app.setLoginItemSettings({
        openAsHidden : true,
        openAtLogin  : enabled,
        path         : app.getPath('exe'),
    });
};

AppHelpers.setLocale = locale => {
    i18next.changeLanguage(locale)
        .then(() => moment.locale(locale))
        .catch(handleError);
};

AppHelpers.isDarkMode = () => AppHelpers.getGlobal('IS_DARK_MODE');

AppHelpers.pathToFileURL = path => url.format({
    pathname : path,
    protocol : 'file',
    slashes  : true,
});

AppHelpers.openURL = uri => electron.remote.shell.openExternal(String(uri));

AppHelpers.reload = () => electron.remote.getCurrentWindow().reload();

AppHelpers.checkForUpdates = async () => {
    const response  = WebClient.get(Constants.UPDATE_URL);
    const extension = process.platform === 'darwin' ? 'dmg' : process.platform === 'win32' ? 'exe' : 'AppImage';

    return [ Constants.APP_VERSION !== response.version, `https://github.com/ayltai/meather/archive/release/Meather-${response.version}.${process.platform}.${extension}`, ];
};

AppHelpers.send = (channel, args) => electron.ipcRenderer.send(channel, args);

AppHelpers.quit = () => electron.remote.app.quit();
