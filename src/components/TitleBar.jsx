import { AppBar, makeStyles, Toolbar, Typography, } from '@material-ui/core';
import { ArrowBackIos, } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';
import { withRouter, } from 'react-router-dom';

import { Action, } from './Action';

const useStyles = makeStyles(() => ({
    root  : {
        flexGrow : 1,
    },
    title : {
        flexGrow : 1,
    },
}));

const TitleBarRoot = props => {
    const classes = useStyles();

    const { t, } = useTranslation();

    return (
        <div className={classes.root}>
            <AppBar
                className={props.className}
                position='sticky'>
                <Toolbar role='toolbar'>
                    <Action
                        tooltip='Back'
                        edge='start'
                        icon={<ArrowBackIos />}
                        onClick={() => props.history.goBack()} />
                    <Typography
                        className={classes.title}
                        variant='h6'
                        noWrap>
                        {t(props.title)}
                    </Typography>
                    {props.action}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export const TitleBar = withRouter(TitleBarRoot);

TitleBar.propTypes = {
    className : PropTypes.string,
    title     : PropTypes.string,
    action    : PropTypes.node,
};

TitleBarRoot.propTypes = {
    ...TitleBar.propTypes,
    history : PropTypes.object.isRequired,
};
