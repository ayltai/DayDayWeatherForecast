import { CssBaseline, } from '@material-ui/core';
import React from 'react';
import { withTranslation, } from 'react-i18next';
import { Route, Switch, } from 'react-router-dom';

import { AppThemeProvider, } from './contexts/AppThemeProvider';
import { Preferences, } from './models/Preferences';
import { About, } from './routes/About';
import { Home, } from './routes/Home';
import { Locations, } from './routes/Locations';
import { Settings, } from './routes/Settings';
import { Constants, } from './Constants';
import logo from './logo.png';
import './css/weather-icons.min.css';

const AppRoot = () => {
    const weatherProvider = Preferences.getWeatherProvider();

    return (
        <AppThemeProvider>
            <CssBaseline />
            <Switch>
                <Route
                    exact
                    path='/'>
                    <Home />
                </Route>
                <Route
                    exact
                    path='/settings'>
                    <Settings
                        title='Settings'
                        locationProviderId={weatherProvider.id}
                        locationApiKey={weatherProvider.apiKey} />
                </Route>
                <Route path='/settings/locations'>
                    <Locations title='Locations' />
                </Route>
                <Route path='/about'>
                    <About
                        title='About'
                        appName={Constants.APP_NAME}
                        version={Constants.APP_VERSION}
                        logo={logo} />
                </Route>
            </Switch>
        </AppThemeProvider>
    );
};

export const App = withTranslation()(AppRoot);
