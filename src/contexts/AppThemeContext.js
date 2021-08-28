import React from 'react';

import { Preferences } from '../models/Preferences';

export const AppThemeContext = React.createContext({
    theme    : Preferences.isDarkMode(),
    setTheme : null,
});
