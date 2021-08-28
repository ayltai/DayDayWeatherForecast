import { Settings, } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen, } from '../utils/TestHelpers';
import { Action, } from './Action';

const Icon = (
    <Settings
        aria-hidden='false'
        role='img' />
);

describe('<Action />', () => {
    it('renders icon correctly', () => {
        render(<Action icon={Icon} />);

        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('triggers onClick when clicked', () => {
        const onClick = jest.fn();

        render(
            <Action
                icon={Icon}
                onClick={onClick} />
        );

        userEvent.click(screen.getByRole('button'));

        expect(onClick).toBeCalledTimes(1);
    });
});
