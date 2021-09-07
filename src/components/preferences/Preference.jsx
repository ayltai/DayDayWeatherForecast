import { ListItem, ListItemSecondaryAction, ListItemText, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

const PreferenceRoot = props => {
    const { t, } = useTranslation();

    return (
        <ListItem
            role='listitem'
            button
            onClick={() => props.onClick && props.onClick()}>
            <ListItemText
                primary={t(props.title)}
                secondary={t(props.description)} />
            {props.secondaryAction && (
                <ListItemSecondaryAction>
                    {props.secondaryAction}
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
};

PreferenceRoot.propTypes = {
    title           : PropTypes.string.isRequired,
    description     : PropTypes.string,
    secondaryAction : PropTypes.node,
    onClick         : PropTypes.func,
};

export const Preference = React.memo(PreferenceRoot);

Preference.propTypes = PreferenceRoot.propTypes;
