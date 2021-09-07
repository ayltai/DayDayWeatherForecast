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

const SelectorRoot = props => {
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

SelectorRoot.propTypes = {
    children : PropTypes.node,
    tooltip  : PropTypes.string,
    onClick  : PropTypes.func,
};

SelectorRoot.defaultProps = {
    tooltip : '',
};

export const Selector = React.memo(SelectorRoot);

Selector.propTypes    = SelectorRoot.propTypes;
Selector.defaultProps = SelectorRoot.defaultProps;
