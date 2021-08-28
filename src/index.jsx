import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@material-ui/core';
import i18next from 'i18next';
import moment from 'moment';
import React from 'react';
import { render, } from 'react-dom';
import { ErrorBoundary, } from 'react-error-boundary';
import { initReactI18next, } from 'react-i18next';
import { HashRouter, } from 'react-router-dom';

import { Preferences, } from './models/Preferences';
import messages_en from './translations/en/messages.json';
import messages_zh from './translations/zh/messages.json';
import { AppHelpers, } from './utils/AppHelpers';
import { handleError, } from './utils/ErrorHelpers';
import { App, } from './App';
import './index.css';

const locale = Preferences.getLocale().value.substr(0, 2);

AppHelpers.setAutoLaunch(Preferences.isAutoLaunch());
moment.locale(locale);

const createFallbackRender = ({ error, resetErrorBoundary, }) => (
    <Dialog
        open
        onClose={resetErrorBoundary}>
        <DialogTitle>Oh no, it crashed!</DialogTitle>
        <DialogContent>
            <DialogContentText>
                <p>A problem caused this application to stop working correctly. The error was:</p>
                <p>{error.name}</p>
                <p>{error.message}</p>
                <p>You may try to recover from the error by clicking &quot;OK&quot;.</p>
            </DialogContentText>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={resetErrorBoundary}>
                    OK
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
);

i18next.use(initReactI18next).init({
    lng           : locale,
    fallbackLng   : 'en',
    nsSeparator   : false,
    keySeparator  : false,
    interpolation : {
        escapeValue : false,
    },
    resources     : {
        en : {
            translation : messages_en,
        },
        zh : {
            translation : messages_zh,
        },
    },
}).then(() => render(
    <React.StrictMode>
        <ErrorBoundary
            fallbackRender={createFallbackRender}
            onError={handleError}>
            <HashRouter>
                <App />
            </HashRouter>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root'),
)).catch(error => {
    handleError(error);

    render(
        <React.StrictMode>
            {createFallbackRender(error)}
        </React.StrictMode>,
        document.getElementById('root'),
    );
});
