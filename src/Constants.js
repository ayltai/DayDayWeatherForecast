import { Location, } from './models/Location';

export const Constants = {};

Constants.APP_NAME    = 'Day Day Weather Forecast';
Constants.APP_VERSION = '1.0.0';
Constants.UPDATE_URL  = 'https://raw.githubusercontent.com/ayltai/DayDayWeatherForecast/master/package.json';
Constants.DOC_URL     = 'https://github.com/ayltai/DayDayWeatherForecast/blob/master/README.md';
Constants.LICENSE_URL = 'https://github.com/ayltai/DayDayWeatherForecast/blob/master/LICENSE';
Constants.ISSUES_URL  = 'https://github.com/ayltai/DayDayWeatherForecast/issues';

Constants.THEME = isDarkMode => ({
    palette : {
        primary   : {
            main  : '#2196f3',
            light : '#2196f3',
            dark  : '#1976d2',
        },
        secondary : {
            main  : '#ff9800',
            light : '#ff9800',
            dark  : '#f57c00',
        },
        info      : {
            main  : '#00bcd4',
            light : '#00bcd4',
            dark  : '#0097a7',
        },
        type      : isDarkMode ? 'dark' : 'light',
    },
});

Constants.TRAY_ICON_SIZE = process.platform === 'darwin' ? 22 : process.platform === 'win32' ? 16 : 24;

Constants.WEATHER_PROVIDERS = [
    {
        id     : 0,
        label  : 'OpenWeatherMap',
        value  : 'OpenWeatherMap',
        apiKey : process.env.REACT_APP_API_KEY_OPENWEATHERMAP,
    },
    {
        id     : 1,
        label  : 'AccuWeather',
        value  : 'AccuWeather',
        apiKey : process.env.REACT_APP_API_KEY_ACCUWEATHER,
    },
];

Constants.LOCATION_PROVIDERS = [
    {
        id     : 0,
        label  : 'HERE Technologies',
        apiKey : process.env.REACT_APP_API_KEY_HERE,
    },
];

Constants.REFRESH_INTERVALS = [
    {
        label : '10 minutes',
        value : 1000 * 60 * 10,
    },
    {
        label : '15 minutes',
        value : 1000 * 60 * 15,
    },
    {
        label : '30 minutes',
        value : 1000 * 60 * 30,
    },
    {
        label : '1 hour',
        value : 1000 * 60 * 60,
    },
];

Constants.UNITS = [
    {
        label : 'SI (°C, km)',
        value : 'si',
    },
    {
        label : 'Imperial (°F, mile)',
        value : 'imperial',
    },
];

Constants.FORECAST_TYPES = [
    {
        label : 'Temperature, precipitation, humidity',
        value : 'humidity',
    },
    {
        label : 'Temperature, precipitation, wind speed',
        value : 'windSpeed',
    },
    {
        label : 'Temperature, precipitation, UV index',
        value : 'uvIndex',
    },
];

Constants.FORECAST_DAYS = [
    {
        label : '3 days',
        value : 3,
    },
    {
        label : '4 days',
        value : 4,
    },
    {
        label : '5 days',
        value : 5,
    },
    {
        label : '7 days',
        value : 7,
    },
];

Constants.FORECAST_HOURS = [
    {
        label : '4 hours',
        value : 4,
    },
    {
        label : '8 hours',
        value : 8,
    },
    {
        label : '12 hours',
        value : 12,
    },
    {
        label : '24 hours',
        value : 24,
    },
];

Constants.LOCALES = [
    {
        label : 'English',
        value : 'en',
    },
    {
        label : '繁體中文',
        value : 'zh-tw',
    },
];

Constants.FORECAST_LAYOUTS = [
    {
        label : 'Horizontal',
        value : 'horizontal',
    },
    {
        label : 'Vertical',
        value : 'vertical',
    },
];

Constants.LOCATION = new Location(process.env.REACT_APP_WEATHER_LATITUDE || 22.3080, process.env.REACT_APP_WEATHER_LONGITUDE || 113.9185, process.env.REACT_APP_WEATHER_LOCATION || 'Hong Kong International Airport, Sky Plaza Road, Chek Lap Kok');

Constants.NOTIFICATION_AUTO_HIDE = 1000 * 3;
Constants.USER_INPUT_DEBOUNCE    = 250;
Constants.UPDATE_INTERVAL        = 1000 * 20;
Constants.IS_AUTO_LAUNCH         = process.env.NODE_ENV !== 'development';
Constants.IS_MILITARY_TIME       = false;
