import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter, } from 'react-router-dom';

import { render, screen, within, } from '../utils/TestHelpers';
import { Constants, } from '../Constants';
import { LocationSelection, } from './LocationSelection';


const component = (
    <MemoryRouter>
        <LocationSelection
            title='Locations'
            locationProviderId={Constants.LOCATION_PROVIDERS[0].id}
            locationApiKey={Constants.LOCATION_PROVIDERS[0].apiKey} />
    </MemoryRouter>
);

describe('<LocationSelection />', () => {
    it('renders correctly', () => {
        render(component);

        expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1);
    });

    it('allows adding new locations', () => {
        render(component);

        userEvent.click(within(screen.getByRole('toolbar')).getAllByRole('button')[1]);

        expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });
});
