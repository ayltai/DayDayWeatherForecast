import React from 'react';
import { MemoryRouter, } from 'react-router-dom';

import { render, screen, } from '../utils/TestHelpers';
import { Constants, } from '../Constants';
import { About, } from './About';
import logo from '../logo.png';

const component = (
    <MemoryRouter>
        <About
            title='About'
            appName={Constants.APP_NAME}
            version={Constants.APP_VERSION}
            logo={logo} />
    </MemoryRouter>
);

describe('<About />', () => {
    it('renders correctly', () => {
        render(component);

        expect(screen.getByText(Constants.APP_NAME)).toBeInTheDocument();
    });
});
