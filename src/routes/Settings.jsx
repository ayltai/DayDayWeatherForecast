import { Dialog, DialogContent, DialogTitle, List, } from '@material-ui/core';
import { Add, } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';
import { withRouter, } from 'react-router-dom';

import { BooleanPreference, } from '../components/preferences/BooleanPreference';
import { ChoicePreference, } from '../components/preferences/ChoicePreference';
import { ConfirmationPreference, } from '../components/preferences/ConfirmationPreference';
import { Preference, } from '../components/preferences/Preference';
import { PreferenceTitle, } from '../components/preferences/PreferenceTitle';
import { Action, } from '../components/Action';
import { Confirmation, } from '../components/Confirmation';
import { LocationSuggestion, } from '../components/LocationSuggestion';
import { Notification, } from '../components/Notification';
import { withTitle, } from '../components/withTitle';
import { AppThemeContext, } from '../contexts/AppThemeContext';
import { usePersistentState } from '../hooks/usePersistentState';
import { Preferences, } from '../models/Preferences';
import { AppHelpers, } from '../utils/AppHelpers';
import { Constants, } from '../Constants';

const SettingsRoot = props => {
    const { theme, setTheme, } = React.useContext(AppThemeContext);

    const [ open,                setOpen,                ] = React.useState(false);
    const [ notification,        setNotification,        ] = React.useState(false);
    const [ notificationMessage, setNotificationMessage, ] = React.useState('');
    const [ confirmation,        setConfirmation,        ] = React.useState(false);
    const [ confirmationMessage, setConfirmationMessage, ] = React.useState('');
    const [ updateUrl,           setUpdateUrl,           ] = React.useState('');

    const [ weatherProvider,   setWeatherProvider,   ] = usePersistentState(Preferences.getWeatherProvider(), Preferences.KEY_WEATHER_PROVIDER);
    const [ locationProvider,  setLocationProvider,  ] = usePersistentState(Preferences.getLocationProvider(), Preferences.KEY_LOCATION_PROVIDER);
    const [ locations,         setLocations,         ] = usePersistentState(Preferences.getLocations(), Preferences.KEY_LOCATIONS);
    const [ refreshInterval,   setRefreshInterval,   ] = usePersistentState(Preferences.getRefreshInterval(), Preferences.KEY_REFRESH_INTERVAL);
    const [ autoLaunch,        setAutoLaunch,        ] = usePersistentState(Preferences.isAutoLaunch(), Preferences.KEY_IS_AUTO_LAUNCH);
    const [ unit,              setUnit,              ] = usePersistentState(Preferences.getUnit(), Preferences.KEY_UNIT);
    const [ forecastType,      setForecastType,      ] = usePersistentState(Preferences.getForecastType(), Preferences.KEY_FORECAST_TYPE);
    const [ forecastDays,      setForecastDays,      ] = usePersistentState(Preferences.getForecastDays(), Preferences.KEY_FORECAST_DAYS);
    const [ forecastHours,     setForecastHours,     ] = usePersistentState(Preferences.getForecastHours(), Preferences.KEY_FORECAST_HOURS);
    const [ locale,            setLocale,            ] = usePersistentState(Preferences.getLocale(), Preferences.KEY_LOCALE);
    const [ forecastLayout,    setForecastLayout,    ] = usePersistentState(Preferences.getForecastLayout(), Preferences.KEY_FORECAST_LAYOUT);
    const [ militaryTime,      setMilitaryTime,      ] = usePersistentState(Preferences.isMilitaryTime(), Preferences.KEY_IS_MILITARY_TIME);
    const [ backgroundBlurred, setBackgroundBlurred, ] = usePersistentState(Preferences.isBackgroundBlurred(), Preferences.KEY_BACKGROUND_BLURRED);
    const [ backgroundDarken,  setBackgroundDarken,  ] = usePersistentState(Preferences.isBackgroundDarken(), Preferences.KEY_BACKGROUND_DARKEN);

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
            <List role='list'>
                <PreferenceTitle title='General' />
                <Preference
                    title='Locations'
                    description={`${locations.length} ${t(`location${locations.length > 1 ? 's' : ''}`)}`}
                    secondaryAction={
                        <Action
                            tooltip='Add location'
                            icon={<Add />}
                            onClick={() => setOpen(true)} />
                    }
                    onClick={() => props.history.push('/settings/locations')} />
                <ChoicePreference
                    title='Refresh interval'
                    description={refreshInterval.label}
                    value={refreshInterval}
                    choices={Constants.REFRESH_INTERVALS}
                    onChange={value => setRefreshInterval(value)} />
                <ChoicePreference
                    title='Forecast days'
                    description={forecastDays.label}
                    value={forecastDays}
                    choices={Constants.FORECAST_DAYS}
                    onChange={value => {
                        setForecastDays(value);

                        Preferences.setLastRefreshTimestamp(0);
                        Preferences.setWeather(null);
                    }} />
                <ChoicePreference
                    title='Forecast hours'
                    description={forecastHours.label}
                    value={forecastHours}
                    choices={Constants.FORECAST_HOURS}
                    onChange={value => {
                        setForecastHours(value);

                        Preferences.setLastRefreshTimestamp(0);
                        Preferences.setWeather(null);
                    }} />
                <ChoicePreference
                    title='Weather provider'
                    description={Constants.WEATHER_PROVIDERS[weatherProvider.id].name}
                    value={weatherProvider}
                    choices={Constants.WEATHER_PROVIDERS}
                    onChange={value => {
                        setWeatherProvider(value);

                        Preferences.setLastRefreshTimestamp(0);
                        Preferences.setWeather(null);
                    }} />
                <ChoicePreference
                    title='Location provider'
                    description={Constants.LOCATION_PROVIDERS[locationProvider.id].name}
                    value={locationProvider}
                    choices={Constants.LOCATION_PROVIDERS}
                    onChange={value => {
                        setLocationProvider(value);

                        Preferences.setLastRefreshTimestamp(0);
                        Preferences.setWeather(null);
                    }} />
                <BooleanPreference
                    title='Auto launch'
                    description='Run on startup'
                    checked={autoLaunch}
                    onChange={checked => setAutoLaunch(checked)} />
                <PreferenceTitle
                    divider
                    title='Display' />
                <ChoicePreference
                    title='Units'
                    description={Constants.UNITS[unit.value === Constants.UNITS[0].value ? 0 : 1].label}
                    value={unit}
                    choices={Constants.UNITS}
                    onChange={value => setUnit(value)} />
                <ChoicePreference
                    title='Forecast type'
                    description={forecastType.label}
                    value={forecastType}
                    choices={Constants.FORECAST_TYPES}
                    onChange={value => setForecastType(value)} />
                <BooleanPreference
                    title='Blur background'
                    checked={backgroundBlurred}
                    onChange={checked => setBackgroundBlurred(checked)} />
                <BooleanPreference
                    title='Dim background'
                    checked={backgroundDarken}
                    onChange={checked => setBackgroundDarken(checked)} />
                <ChoicePreference
                    title='Language'
                    description={locale.label}
                    value={locale}
                    choices={Constants.LOCALES}
                    onChange={value => {
                        setLocale(value);

                        Preferences.setLastRefreshTimestamp(0);
                        Preferences.setWeather(null);

                        AppHelpers.setLocale(value);
                    }} />
                <BooleanPreference
                    title='Dark mode'
                    checked={theme}
                    onChange={checked => setTheme(checked)} />
                <ChoicePreference
                    title='Forecast layout'
                    description={forecastLayout.label}
                    value={forecastLayout}
                    choices={Constants.FORECAST_LAYOUTS}
                    onChange={value => setForecastLayout(value)} />
                <BooleanPreference
                    title='24-hour clock'
                    checked={militaryTime}
                    onChange={checked => setMilitaryTime(checked)} />
                <PreferenceTitle
                    divider
                    title='Help' />
                <Preference
                    title='About'
                    onClick={() => props.history.push('/about')} />
                <Preference
                    title='Check for updates'
                    onClick={async () => {
                        const [ hasUpdates, url, ] = await AppHelpers.checkForUpdates();

                        if (hasUpdates) {
                            setUpdateUrl(url);
                            setConfirmation(true);
                            setConfirmationMessage(t('An update is available. Do you want to download it now?'));
                        }
                    }} />
                {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' && (
                    <Preference
                        title='Toggle Developer Tools'
                        onClick={() => AppHelpers.toggleDevTools()} />
                ))}
                <ConfirmationPreference
                    title='Reset settings'
                    message='Are you sure to reset all settings to default values?'
                    onResponse={response => {
                        if (response) {
                            Preferences.clear();

                            setNotificationMessage('Settings are reset to default values');
                            setNotification(true);
                        }
                    }} />
                <Preference
                    title='Documentation'
                    onClick={() => AppHelpers.openURL(Constants.DOC_URL)} />
                <Preference
                    title='View license'
                    onClick={() => AppHelpers.openURL(Constants.LICENSE_URL)} />
                <Preference
                    title='Report an issue'
                    onClick={() => AppHelpers.openURL(Constants.ISSUES_URL)} />
                <ConfirmationPreference
                    title='Exit'
                    message='Are you sure you want to exit?'
                    onResponse={response => response && AppHelpers.quit()} />
            </List>
            {notification && (
                <Notification
                    autoClose
                    type='info'
                    message={notificationMessage}
                    onClose={() => setNotification(false)} />
            )}
            {confirmation && (
                <Confirmation
                    title='Confirmation'
                    message={confirmationMessage}
                    show={confirmation}
                    onClose={() => setConfirmation(false)}
                    onResponse={response => response && updateUrl && AppHelpers.openURL(updateUrl)} />
            )}
        </>
    );
};

export const Settings = withRouter(withTitle(SettingsRoot));

Settings.propTypes = {
    title              : PropTypes.string,
    locationProviderId : PropTypes.number.isRequired,
    locationApiKey     : PropTypes.string.isRequired,
};

SettingsRoot.propTypes = {
    history : PropTypes.object.isRequired,
    ...Settings.propTypes,
};
