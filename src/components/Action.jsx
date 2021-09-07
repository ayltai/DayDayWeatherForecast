import { IconButton, makeStyles, Tooltip, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    root : {
        padding : theme.spacing(1),
    }
}));

const ActionRoot = props => {
    const classes = useStyles();

    const { t, } = useTranslation();

    return (
        <Tooltip title={t(props.tooltip)}>
            <IconButton
                role='button'
                className={classes.root}
                edge={props.edge}
                onClick={() => props.onClick && props.onClick()}>
                {props.icon}
            </IconButton>
        </Tooltip>
    );
};

ActionRoot.propTypes = {
    tooltip : PropTypes.string,
    icon    : PropTypes.node.isRequired,
    edge    : PropTypes.oneOf([
        'end',
        'start',
    ]),
    onClick : PropTypes.func,
};

ActionRoot.defaultProps = {
    tooltip : '',
};

export const Action = React.memo(ActionRoot);

Action.propTypes    = ActionRoot.propTypes;
Action.defaultProps = ActionRoot.defaultProps;
