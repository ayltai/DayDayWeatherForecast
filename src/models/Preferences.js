import { AppHelpers, } from '../utils/AppHelpers';
import { Constants, } from '../Constants';
import { Location, } from './Location';

const getItem = (key, defaultValue) => {
    const value = window.localStorage.getItem(key);
    return value && value !== null && typeof value !== 'undefined' ? value : defaultValue;
};

const setItem = (key, value) => {
    if (value) {
        window.localStorage.setItem(key, value);
    } else {
        window.localStorage.removeItem(key);
    }
};

const toObject = value => {
    if (value) return JSON.parse(value);
    return value;
};

export const Preferences = {};

Preferences.KEY_LOCATIONS                           = 'locations';
Preferences.KEY_SELECTED_LOCATION_INDEX             = 'selectedLocationIndex';
Preferences.KEY_REFRESH_INTERVAL                    = 'refreshInterval';
Preferences.KEY_LAST_REFRESH_TIMESTAMP              = 'lastRefreshTimestamp';
Preferences.KEY_IS_AUTO_LAUNCH                      = 'isAutoLaunch';
Preferences.KEY_UNIT                                = 'unit';
Preferences.KEY_FORECAST_TYPE                       = 'forecastType';
Preferences.KEY_FORECAST_DAYS                       = 'forecastDays';
Preferences.KEY_FORECAST_HOURS                      = 'forecastHours';
Preferences.KEY_LOCALE                              = 'locale';
Preferences.KEY_FORECAST_LAYOUT                     = 'forecastLayout';
Preferences.KEY_IS_DARK_MODE                        = 'isDarkMode';
Preferences.KEY_IS_MILITARY_TIME                    = 'isMilitaryTime';
Preferences.KEY_WEATHER_PROVIDER                    = 'weatherProvider';
Preferences.KEY_LOCATION_PROVIDER                   = 'locationProvider';
Preferences.KEY_BACKGROUND_DARKEN                   = 'backgroundDarken';
Preferences.KEY_BACKGROUND_BLURRED                  = 'backgroundBlurred';
Preferences.KEY_BACKGROUND_IMAGE_URL                = 'backgroundImageUrl';
Preferences.KEY_BACKGROUND_IMAGE_AUTHOR             = 'backgroundImageAuthor';
Preferences.KEY_BACKGROUND_IMAGE_AUTHOR_PROFILE_URL = 'backgroundImageAuthorProfileUrl';
Preferences.KEY_WEATHER                             = 'weather';

Preferences.getLocations = () => toObject(getItem(Preferences.KEY_LOCATIONS, JSON.stringify([ Constants.LOCATION, ]))).map(location => new Location(location.latitude, location.longitude, location.name));

Preferences.getSelectedLocationIndex = () => Number(getItem(Preferences.KEY_SELECTED_LOCATION_INDEX, 0));

Preferences.getSelectedLocation = () => Preferences.getLocations()[Preferences.getSelectedLocationIndex()];

Preferences.getRefreshInterval = () => toObject(getItem(Preferences.KEY_REFRESH_INTERVAL, JSON.stringify(Constants.REFRESH_INTERVALS[2])));

Preferences.getLastRefreshTimestamp = () => Number(getItem(Preferences.KEY_LAST_REFRESH_TIMESTAMP, Date.now()));

Preferences.setLastRefreshTimestamp = value => setItem(Preferences.KEY_LAST_REFRESH_TIMESTAMP, value);

Preferences.isAutoLaunch = () => Boolean(getItem(Preferences.KEY_IS_AUTO_LAUNCH, Constants.IS_AUTO_LAUNCH));

Preferences.getUnit = () => toObject(getItem(Preferences.KEY_UNIT, JSON.stringify(Constants.UNITS[0])));

Preferences.getForecastType = () => toObject(getItem(Preferences.KEY_FORECAST_TYPE, JSON.stringify(Constants.FORECAST_TYPES[0])));

Preferences.getForecastDays = () => toObject(getItem(Preferences.KEY_FORECAST_DAYS, JSON.stringify(Constants.FORECAST_DAYS[1])));

Preferences.getForecastHours = () => toObject(getItem(Preferences.KEY_FORECAST_HOURS, JSON.stringify(Constants.FORECAST_HOURS[1])));

Preferences.getLocale = () => toObject(getItem(Preferences.KEY_LOCALE, JSON.stringify(Constants.LOCALES[0])));

Preferences.getForecastLayout = () => toObject(getItem(Preferences.KEY_FORECAST_LAYOUT, JSON.stringify(Constants.FORECAST_LAYOUTS[1])));

Preferences.isDarkMode = () => Boolean(getItem(Preferences.KEY_IS_DARK_MODE, AppHelpers.isDarkMode()));

Preferences.isMilitaryTime = () => Boolean(getItem(Preferences.KEY_IS_MILITARY_TIME, Constants.IS_MILITARY_TIME));

Preferences.getWeatherProvider = () => toObject(getItem(Preferences.KEY_WEATHER_PROVIDER, JSON.stringify(Constants.WEATHER_PROVIDERS[0])));

Preferences.getLocationProvider = () => toObject(getItem(Preferences.KEY_LOCATION_PROVIDER, JSON.stringify(Constants.LOCATION_PROVIDERS[0])));

Preferences.isBackgroundDarken = () => Boolean(getItem(Preferences.KEY_BACKGROUND_DARKEN, true));

Preferences.isBackgroundBlurred = () => Boolean(getItem(Preferences.KEY_BACKGROUND_BLURRED, true));

Preferences.getBackgroundImageUrl = () => getItem(Preferences.KEY_BACKGROUND_IMAGE_URL);

Preferences.getBackgroundImageAuthor = () => getItem(Preferences.KEY_BACKGROUND_IMAGE_AUTHOR);

Preferences.getBackgroundImageAuthorProfileUrl = () => getItem(Preferences.KEY_BACKGROUND_IMAGE_AUTHOR_PROFILE_URL);

Preferences.getWeather = () => toObject(getItem(Preferences.KEY_WEATHER));

Preferences.setWeather = value => setItem(Preferences.KEY_WEATHER, value);

Preferences.clear = () => window.localStorage.clear();
