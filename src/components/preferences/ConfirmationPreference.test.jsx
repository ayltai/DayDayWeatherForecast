import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen, within } from '../../utils/TestHelpers';
import { ConfirmationPreference, } from './ConfirmationPreference';

describe('<ConfirmationPreference />', () => {
    it('asks for confirmation when clicked', () => {
        const onResponse = jest.fn();

        render(
            <ConfirmationPreference
                title='Exit'
                description='Exit the application'
                message='Are you sure to exit the application?'
                positiveAction='Yes'
                negativeAction='No'
                onResponse={onResponse} />
        );

        const listItem = screen.getByRole('listitem');
        expect(within(listItem).getByText('Exit')).toBeInTheDocument();

        userEvent.click(listItem);

        const dialog = screen.getAllByRole('dialog')[0];
        expect(dialog).toBeInTheDocument();

        expect(within(dialog).getAllByRole('button').length).toBe(2);
    });
});
