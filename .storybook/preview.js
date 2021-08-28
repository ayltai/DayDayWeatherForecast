import { createTheme, ThemeProvider, } from '@material-ui/core';
import { addDecorator, } from '@storybook/react';
import { withThemes, } from '@react-theming/storybook-addon';

const darkTheme = {
    themeName : 'Light theme',
    palette   : {
        background : {
            default : '#fafafa',
            paper   : '#fff',
        },
        primary    : {
            main  : '#2196f3',
            light : '#2196f3',
            dark  : '#1976d2',
        },
        secondary  : {
            main  : '#ff9800',
            light : '#ff9800',
            dark  : '#f57c00',
        },
        info       : {
            main  : '#00bcd4',
            light : '#00bcd4',
            dark  : '#0097a7',
        },
        text       : {
            primary   : 'rgba(0, 0, 0, .87)',
            secondary : 'rgba(255, 255, 255, .7)',
            disabled  : 'rgba(255, 255, 255, .5)',
        },
        type       : 'light',
    },
};

const providerFn = ({ theme, children, }) => (
    <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>
);

addDecorator(withThemes(null, [
    darkTheme,
], {
    providerFn,
}));

export const parameters = {
    actions     : {
        argTypesRegex : '^on[A-Z].*'
    },
    backgrounds : {
        default : 'light',
        values  : [
            {
                name  : 'light',
                value : '#fafafa',
            },
        ],
    },
    controls    : {
        matchers : {
            date : /Date$/,
        },
    },
    options     : {
        storySort : {
            method : 'alphabetical',
        },
    },
};
