import { Settings, } from '@material-ui/icons';
import { render, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropTypes from 'prop-types';
import React from 'react';

import { Action } from '../components/Action';
import { screen, } from '../utils/TestHelpers';
import { AppThemeContext, } from './AppThemeContext';
import { AppThemeProvider, } from './AppThemeProvider';

const App = ({ children, }) => (
    <AppThemeProvider>{children}</AppThemeProvider>
);

App.propTypes = {
    children : PropTypes.node,
};

const Component = () => {
    const { theme, setTheme, } = React.useContext(AppThemeContext);

    return (
        <Action
            icon={<Settings />}
            onClick={() => setTheme(!theme)} />
    );
};

describe('<AppThemeProvider />', () => {
    it('set theme without errors', async () => {
        const clear      = jest.fn();
        const getItem    = jest.fn();
        const setItem    = jest.fn();
        const removeItem = jest.fn();

        Object.defineProperty(window, 'localStorage', {
            value : (() => ({
                clear,
                getItem,
                setItem,
                removeItem,
            }))(),
        });

        render(
            <App>
                <Component />
            </App>
        );

        expect(getItem.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(setItem.mock.calls.length).toBe(0);

        userEvent.click(screen.getByRole('button'));

        expect(setItem.mock.calls.length).toBe(1);
    });
});
