import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter, } from 'react-router-dom';

import { render, screen, within, } from '../utils/TestHelpers';
import { Constants, } from '../Constants';
import { Settings, } from './Settings';

const component = (
    <MemoryRouter>
        <Settings
            title='Settings'
            locationProviderId={Constants.LOCATION_PROVIDERS[0].id}
            locationApiKey={Constants.LOCATION_PROVIDERS[0].apiKey} />
    </MemoryRouter>
);

describe('<Settings />', () => {
    it('renders correctly', () => {
        render(component);

        expect(screen.getByText('Locations')).toBeInTheDocument();
    });

    it('shows a confirmation dialog when "Reset settings" action is clicked', async () => {
        render(component);

        const listItem = screen.getAllByRole('listitem').filter(element => within(element).queryByText('Reset settings'))[0];
        expect(listItem).toBeInTheDocument();
        userEvent.click(listItem);

        const dialog = screen.getAllByRole('dialog')[0];
        expect(dialog).toBeInTheDocument();
        expect(within(dialog).getAllByRole('button').length).toBe(2);
    });
});
