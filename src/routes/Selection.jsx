import { Add, Check, Delete, } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

import { Action, } from '../components/Action';
import { Choices, } from '../components/Choices';
import { withTitle, } from '../components/withTitle';

const SelectionBase = props => {
    return (
        <Choices
            icon={<Check />}
            action={
                <Action
                    tooltip='Delete'
                    edge='end'
                    icon={<Delete />} />
            }
            value={props.value}
            choices={props.choices}
            onSelect={(selected, index) => props.onSelect && props.onSelect(selected, index)}
            onAction={(deleted, index) => props.onDelete && props.onDelete(deleted, index)} />
    );
};

const TitledSelection = withTitle(SelectionBase);

const SelectionRoot = props => (
    <TitledSelection
        action={
            <Action
                tooltip='Add'
                edge='end'
                icon={<Add />}
                onClick={() => props.onAdd && props.onAdd()} />
        }
        {...props} />
);

SelectionRoot.propTypes = {
    title     : PropTypes.string,
    value     : PropTypes.shape({
        label : PropTypes.string,
        value : PropTypes.any,
    }),
    choices   : PropTypes.arrayOf(PropTypes.shape({
        label : PropTypes.string,
        value : PropTypes.any,
    })),
    onSelect  : PropTypes.func,
    onAdd     : PropTypes.func,
    onDelete  : PropTypes.func,
};

TitledSelection.propTypes = {
    action    : PropTypes.node,
    ...SelectionRoot.propTypes,
};

SelectionBase.propTypes = {
    ...TitledSelection.propTypes,
};

export const Selection = React.memo(SelectionRoot);

Selection.propTypes = SelectionRoot.propTypes;
