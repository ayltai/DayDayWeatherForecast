import { Button, makeStyles, Tooltip, } from '@material-ui/core';
import { UnfoldMore, } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    root : {
        padding       : theme.spacing(1),
        textTransform : 'none',
    }
}));

export const Selector = props => {
    const classes = useStyles();

    const { t, } = useTranslation();

    return (
        <Tooltip title={t(props.tooltip)}>
            <Button
                role='button'
                className={classes.root}
                endIcon={<UnfoldMore />}
                size='small'
                fullWidth
                onClick={() => props.onClick && props.onClick()}>
                {props.children}
            </Button>
        </Tooltip>
    );
};

Selector.propTypes = {
    children : PropTypes.node,
    tooltip  : PropTypes.string,
    onClick  : PropTypes.func,
};

Selector.defaultProps = {
    tooltip : '',
};
