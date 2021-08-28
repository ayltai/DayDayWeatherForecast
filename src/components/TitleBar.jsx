import { AppBar, IconButton, Toolbar, Typography, } from '@material-ui/core';
import { ArrowBackIos, } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';
import { withRouter, } from 'react-router-dom';

const TitleBarRoot = props => {
    const { t, } = useTranslation();

    return (
        <AppBar
            className={props.className}
            position='sticky'>
            <Toolbar role='toolbar'>
                <IconButton
                    color='inherit'
                    edge='start'
                    onClick={() => props.history.goBack()}>
                    <ArrowBackIos />
                </IconButton>
                <Typography
                    variant='h6'
                    noWrap>
                    {t(props.title)}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export const TitleBar = withRouter(TitleBarRoot);

TitleBar.propTypes = {
    className : PropTypes.string,
    title     : PropTypes.string,
};

TitleBarRoot.propTypes = {
    ...TitleBar.propTypes,
    history : PropTypes.object.isRequired,
};
