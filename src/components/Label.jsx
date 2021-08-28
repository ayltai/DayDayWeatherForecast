import { makeStyles, Tooltip, Typography, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    text   : {
        userSelect : 'none',
        padding    : theme.spacing(0.5),
    },
    shadow : {
        userSelect : 'none',
        padding    : theme.spacing(0.5),
        textShadow : `0 0 5px rgba(${theme.palette.type === 'dark' ? '0, 0, 0' : '255, 255, 255'}, 0.8)`,
    },
}));

export const Label = props => {
    const classes = useStyles();

    const { t, } = useTranslation();

    return (
        <Tooltip
            classes={props.className}
            title={t(props.tooltip)}>
            <Typography
                className={props.noShadow ? classes.text : classes.shadow}
                display={props.display}
                align={props.align}
                color={props.color}
                noWrap={props.noWrap}
                variant={props.variant}>
                {props.children}
            </Typography>
        </Tooltip>
    );
};

Label.propTypes = {
    className : PropTypes.string,
    children  : PropTypes.node,
    tooltip   : PropTypes.node,
    align     : PropTypes.oneOf([
        'inherit',
        'left',
        'center',
        'right',
        'justify',
    ]),
    color     : PropTypes.oneOf([
        'initial',
        'inherit',
        'primary',
        'secondary',
        'textPrimary',
        'textSecondary',
        'error',
    ]),
    display   : PropTypes.oneOf([
        'block',
        'inline',
    ]),
    noWrap    : PropTypes.bool,
    noShadow  : PropTypes.bool,
    variant   : PropTypes.oneOf([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'button',
        'overline',
        'srOnly',
        'inherit',
    ]),
};

Label.defaultProps = {
    tooltip  : '',
    align    : 'inherit',
    color    : 'textPrimary',
    display  : 'block',
    noWrap   : false,
    noShadow : false,
    variant  : 'body1',
};
