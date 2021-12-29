import { CssBaseline, } from '@material-ui/core';
import React from 'react';
import { withTranslation, } from 'react-i18next';
import { Route, Routes, } from 'react-router-dom';

import { AppThemeProvider, } from './contexts/AppThemeProvider';
import { Preferences, } from './models/Preferences';
import { About, } from './routes/About';
import { Home, } from './routes/Home';
import { LocationSelection, } from './routes/LocationSelection';
import { Settings, } from './routes/Settings';
import { Constants, } from './Constants';
import logo from './logo.png';
import './css/weather-icons.min.css';

const AppRoot = () => {
    const weatherProvider = Preferences.getWeatherProvider();

    return (
        <AppThemeProvider>
            <CssBaseline />
            <Routes>
                <Route
                    path='/'
                    element={<Home />} />
                <Route
                    path='/settings'
                    element={<Settings title='Settings' />} />
                <Route
                    path='/settings/locations'
                    element={
                        <LocationSelection
                            title='Locations'
                            locationProviderId={weatherProvider.id}
                            locationApiKey={weatherProvider.apiKey} />
                    } />
                <Route
                    path='/about'
                    element={
                        <About
                            title='About'
                            appName={Constants.APP_NAME}
                            version={Constants.APP_VERSION}
                            logo={logo} />
                    } />
            </Routes>
        </AppThemeProvider>
    );
};

export const App = withTranslation()(AppRoot);
