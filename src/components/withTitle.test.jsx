import React from 'react';
import { MemoryRouter, } from 'react-router-dom';

import { render, screen } from '../utils/TestHelpers';
import { withTitle, } from './withTitle';

const ContentRoot = () => <div title='content' />;

const Content = withTitle(ContentRoot);

describe('withTitle()', () => {
    it('adds a toolbar to the wrapped component', () => {
        render(
            <MemoryRouter>
                <Content />
            </MemoryRouter>
        );

        expect(screen.getByRole('toolbar')).toBeInTheDocument();
        expect(screen.getByTitle('content')).toBeInTheDocument();
    });
});
