import { createTheme, ThemeProvider, } from '@material-ui/core';
import { render, } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';

const Wrapper = ({ children, }) => (
    <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
);

Wrapper.propTypes = {
    children : PropTypes.node,
};

const CustomRender = (ui, options) => render(ui, {
    wrapper : Wrapper,
    ...options,
});

export * from '@testing-library/react';
export {
    CustomRender as render,
};
