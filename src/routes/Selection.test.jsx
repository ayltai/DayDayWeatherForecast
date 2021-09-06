import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter, } from 'react-router-dom';

import { render, screen, within, } from '../utils/TestHelpers';
import { Selection, } from './Selection';

describe('<Selection />', () => {
    it('responds to select, add, and delete correctly', () => {
        const onSelect = jest.fn();
        const onAdd    = jest.fn();
        const onDelete = jest.fn();

        const component = (
            <MemoryRouter>
                <Selection
                    title='Locations'
                    value={{
                        label : 'Line 1',
                        value : 'line-1',
                    }}
                    choices={[
                        {
                            label : 'Line 1',
                            value : 'line-1',
                        },
                        {
                            label : 'Line 2',
                            value : 'line-2',
                        },
                    ]}
                    onSelect={onSelect}
                    onAdd={onAdd}
                    onDelete={onDelete} />
            </MemoryRouter>
        );

        render(component);

        userEvent.click(screen.getByText('Line 2'));

        expect(onSelect).toBeCalledTimes(1);

        userEvent.click(within(screen.getByRole('toolbar')).getAllByRole('button')[1]);

        expect(onAdd).toBeCalledTimes(1);
    });
});
