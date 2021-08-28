import PropTypes from 'prop-types';
import React from 'react';

import { LocationApiClient, } from '../apis/LocationApiClient';
import { Location, } from '../models/Location';
import { Preferences } from '../models/Preferences';
import { Suggestion, } from './Suggestion';

export const LocationSuggestion = props => {
    const [ suggestions, setSuggestions, ] = React.useState([]);

    return (
        <Suggestion
            hint='Search'
            suggestions={suggestions}
            onChange={async value => setSuggestions(value ? await LocationApiClient.getSuggestions(props.providerId, value, Preferences.getLocale().value) : [])}
            onSelect={async value => {
                const [ latitude, longitude, ] = await LocationApiClient.getGeocode(props.providerId, value, Preferences.getLocale().value);

                if (latitude && longitude && props.onSelect) {
                    props.onSelect(new Location(latitude, longitude, value));
                } else {
                    setSuggestions([]);
                }
            }} />
    );
};

LocationSuggestion.propTypes = {
    providerId : PropTypes.number.isRequired,
    apiKey     : PropTypes.string.isRequired,
    onSelect   : PropTypes.func,
};
