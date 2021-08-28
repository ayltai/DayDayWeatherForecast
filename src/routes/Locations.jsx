import { Delete, LocationOn, } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

import { Action, } from '../components/Action';
import { Choices, } from '../components/Choices';
import { withTitle, } from '../components/withTitle';
import { Location, } from '../models/Location';
import { usePersistentState, } from '../hooks/usePersistentState';
import { Preferences, } from '../models/Preferences';

const LocationsRoot = () => {
    const [ locations,             setLocations,             ] = usePersistentState(Preferences.getLocations(), Preferences.KEY_LOCATIONS);
    const [ selectedLocationIndex, setSelectedLocationIndex, ] = usePersistentState(Preferences.getSelectedLocationIndex(), Preferences.KEY_SELECTED_LOCATION_INDEX);

    return (
        <Choices
            icon={<LocationOn />}
            action={
                <Action
                    tooltip='Delete'
                    edge='end'
                    icon={<Delete />} />
            }
            value={{
                label : locations.map(location => new Location(location.latitude, location.longitude, location.name))[selectedLocationIndex].displayName,
                value : locations.map(location => new Location(location.latitude, location.longitude, location.name))[selectedLocationIndex].displayName,
            }}
            choices={locations.map(location => new Location(location.latitude, location.longitude, location.name)).map(location => ({
                label : location.displayName,
                value : location.displayName,
            }))}
            onSelect={(selected, index) => {
                Preferences.setLastRefreshTimestamp(0);

                setSelectedLocationIndex(index);
            }}
            onAction={deletedLocation => {
                setLocations(locations.map(location => new Location(location.latitude, location.longitude, location.name)).filter(location => location.displayName !== deletedLocation.value));
            }} />
    );
};

export const Locations = withTitle(LocationsRoot);

Locations.propTypes = {
    title : PropTypes.string,
};

LocationsRoot.propTypes = {
    ...Locations.propTypes,
};
