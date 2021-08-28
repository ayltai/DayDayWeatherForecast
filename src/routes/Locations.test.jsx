import React from 'react';
import { MemoryRouter, } from 'react-router-dom';

import { render, screen, } from '../utils/TestHelpers';
import { Locations, } from './Locations';

const component = (
    <MemoryRouter>
        <Locations title='Locations' />
    </MemoryRouter>
);

describe('<Locations />', () => {
    it('renders correctly', () => {
        render(component);

        expect(screen.getByRole('list')).toBeInTheDocument();
    });
});
