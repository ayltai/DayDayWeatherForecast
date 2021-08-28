import { createTheme, ThemeProvider, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Constants } from '../Constants';

import { usePersistentState } from '../hooks/usePersistentState';
import { Preferences } from '../models/Preferences';
import { AppThemeContext, } from './AppThemeContext';

export const AppThemeProvider = props => {
    const [ isDarkMode, setIsDarkMode, ] = usePersistentState(Preferences.isDarkMode(), Preferences.KEY_IS_DARK_MODE);

    const createThemeFromPalette = React.useCallback(() => createTheme(Constants.THEME(isDarkMode)), [ isDarkMode, ]);

    return (
        <AppThemeContext.Provider value={{
            theme    : isDarkMode,
            setTheme : setIsDarkMode,
        }}>
            <ThemeProvider theme={createThemeFromPalette()}>{props.children}</ThemeProvider>
        </AppThemeContext.Provider>
    );
};

AppThemeProvider.propTypes = {
    children : PropTypes.node,
};
