import { Switch, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { Preference, } from './Preference';

const BooleanPreferenceRoot = props => (
    <Preference
        {...props}
        secondaryAction={
            <Switch
                checked={props.checked}
                onChange={event => props.onChange && props.onChange(event.target.checked)} />
        } />
);

BooleanPreferenceRoot.propTypes = {
    ...Preference.propTypes,
    checked  : PropTypes.bool,
    onChange : PropTypes.func,
};

export const BooleanPreference = React.memo(BooleanPreferenceRoot);

BooleanPreference.propTypes = BooleanPreferenceRoot.propTypes;
