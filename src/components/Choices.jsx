import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

const ChoicesRoot = props => {
    const { t, } = useTranslation();

    return (
        <List role='list'>
            {props.choices.map((choice, index) => (
                <ListItem
                    key={index}
                    role='listitem'
                    button
                    onClick={() => props.onSelect && props.onSelect(choice, index)}>
                    {props.value && props.value.value === choice.value && (
                        <ListItemIcon>{props.icon}</ListItemIcon>
                    )}
                    <ListItemText
                        inset={props.value && props.value.value !== choice.value}
                        primary={t(choice.label)} />
                    {props.action && (
                        <ListItemSecondaryAction onClick={() => props.onAction && props.onAction(choice, index)}>{props.action}</ListItemSecondaryAction>
                    )}
                </ListItem>
            ))}
        </List>
    );
};

ChoicesRoot.propTypes = {
    className : PropTypes.string,
    icon      : PropTypes.node,
    action    : PropTypes.node,
    value     : PropTypes.shape({
        label : PropTypes.string,
        value : PropTypes.any,
    }),
    choices   : PropTypes.arrayOf(PropTypes.shape({
        label : PropTypes.string,
        value : PropTypes.any,
    })),
    onSelect  : PropTypes.func,
    onAction  : PropTypes.func,
};

ChoicesRoot.defaultProps = {
    choices : [],
};

export const Choices = React.memo(ChoicesRoot);

Choices.propTypes    = ChoicesRoot.propTypes;
Choices.defaultProps = ChoicesRoot.defaultProps;
