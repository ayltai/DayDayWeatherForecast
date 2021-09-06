import { Dialog, DialogContent, DialogTitle, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { LocationSuggestion, } from '../components/LocationSuggestion';
import { usePersistentState, } from '../hooks/usePersistentState';
import { Location, } from '../models/Location';
import { Preferences, } from '../models/Preferences';
import { Selection, } from './Selection';

export const LocationSelection = props => {
    const [ open,                  setOpen,                  ] = React.useState(false);
    const [ locations,             setLocations,             ] = usePersistentState(Preferences.getLocations(), Preferences.KEY_LOCATIONS);
    const [ selectedLocationIndex, setSelectedLocationIndex, ] = usePersistentState(Preferences.getSelectedLocationIndex(), Preferences.KEY_SELECTED_LOCATION_INDEX);

    const { t, } = useTranslation();

    return (
        <>
            <Dialog
                role='dialog'
                fullWidth
                maxWidth='xl'
                open={open}
                onClose={() => setOpen(false)}>
                <DialogTitle>{t('Add Location')}</DialogTitle>
                <DialogContent>
                    <LocationSuggestion
                        providerId={props.locationProviderId}
                        apiKey={props.locationApiKey}
                        onSelect={selectedLocation => {
                            if (!locations.map(location => location.name).includes(selectedLocation.name)) {
                                const newLocations = [ ...locations, ];
                                newLocations.push(selectedLocation);

                                setLocations(newLocations);

                                setOpen(false);
                            }
                        }} />
                </DialogContent>
            </Dialog>
            <Selection
                title={props.title}
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
                onAdd={() => setOpen(true)}
                onDelete={(deleted, index) => {
                    setLocations(locations.splice(index, 1));

                    if (index === selectedLocationIndex) {
                        Preferences.setLastRefreshTimestamp(0);

                        setSelectedLocationIndex(0);
                    } else if (index < selectedLocationIndex) {
                        setSelectedLocationIndex(selectedLocationIndex - 1);
                    }
                }} />
        </>
    );
};

LocationSelection.propTypes = {
    title              : PropTypes.string,
    locationProviderId : PropTypes.number.isRequired,
    locationApiKey     : PropTypes.string.isRequired,
};
