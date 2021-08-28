import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen, } from '../utils/TestHelpers';
import { Choices, } from './Choices';

const CHOICES = [
    {
        label : 'Line 1',
        value : 'line-1',
    },
    {
        label : 'Line 2',
        value : 'line-2',
    },
];

describe('<Choices />', () => {
    it('renders correctly', () => {
        render(
            <Choices
                value={CHOICES[1]}
                choices={CHOICES} />
        );

        expect(screen.getByText('Line 1')).toBeInTheDocument();
        expect(screen.getByText('Line 2')).toBeInTheDocument();
    });

    it('triggers onSelect when selected', () => {
        const handleSelect = jest.fn();
        const onSelect     = () => handleSelect();

        render(
            <Choices
                value={CHOICES[1]}
                choices={CHOICES}
                onSelect={onSelect} />
        );

        userEvent.click(screen.getByText('Line 1'));

        expect(handleSelect).toBeCalledTimes(1);
    });
});
