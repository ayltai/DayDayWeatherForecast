import { Box, Divider, Grid, makeStyles, } from '@material-ui/core';
import { InfoOutlined, Schedule, Settings, } from '@material-ui/icons';
import { Skeleton, } from '@material-ui/lab';
import moment from 'moment';
import path from 'path';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { UnsplashApiClient, } from '../apis/UnsplashApiClient';
import { WeatherApiClient, } from '../apis/WeatherApiClient';
import { Action, } from '../components/Action';
import { FontIcon, } from '../components/FontIcon';
import { Currently, } from '../components/weather/Currently';
import { Daily, } from '../components/weather/Daily';
import { Hourly, } from '../components/weather/Hourly';
import { useInterval, } from '../hooks/useInterval';
import { usePersistentState, } from '../hooks/usePersistentState';
import { withRouter, } from '../hooks/withRouter';
import { Preferences, } from '../models/Preferences';
import { AppHelpers } from '../utils/AppHelpers';
import { DateTimeHelpers, } from '../utils/DateTimeHelpers';
import { handleError, } from '../utils/ErrorHelpers';
import { UnitHelpers, } from '../utils/UnitHelpers';
import { WeatherHelpers, } from '../utils/WeatherHelpers';
import { Constants, } from '../Constants';

const useStyles = makeStyles(theme => ({
    hourly : {
        width  : window.innerWidth - theme.spacing(1),
        height : window.innerWidth / 2,
    },
}));

const shouldRefresh = () => (Date.now() - Preferences.getLastRefreshTimestamp() > Preferences.getRefreshInterval().value) || !Preferences.getWeather() || !Preferences.getBackgroundImageUrl();

const refresh = () => shouldRefresh() && AppHelpers.reload();

const createDailies = (weather, count) => {
    const dailies = [];

    for (let i = 0; i < count; i++) dailies.push(
        <React.Fragment key={String(i)}>
            {i > 0 && Preferences.getForecastLayout().value === Constants.FORECAST_LAYOUTS[1].value && (
                <Divider
                    orientation={Preferences.getForecastLayout().value}
                    flexItem />
            )}
            <Grid item>
                <Daily
                    orientation={Preferences.getForecastLayout().value}
                    date={moment().add(i, 'days').toDate()}
                    providerId={Preferences.getWeatherProvider().id}
                    unit={Preferences.getUnit().value}
                    summary={weather.daily[i].summary}
                    iconId={weather.daily[i].icon}
                    temperatureHighPrefix={<FontIcon className='fas fa-thermometer-full' />}
                    temperatureHigh={weather.daily[i].temperatureHigh}
                    temperatureLowPrefix={<FontIcon className='fas fa-thermometer-quarter' />}
                    temperatureLow={weather.daily[i].temperatureLow}
                    humidityPrefix={<FontIcon className='fas fa-tint' />}
                    humidity={weather.daily[i].humidity}
                    precipPrefix={<FontIcon className='fas fa-cloud-rain' />}
                    precipProbability={weather.daily[i].precipProbability}
                    precipIntensity={weather.daily[i].precipIntensity}
                    windSpeedPrefix={<FontIcon className='fas fa-wind' />}
                    windSpeed={weather.daily[i].windSpeed}
                    uvIndexPrefix={<FontIcon className='fas fa-sun' />}
                    uvIndex={weather.daily[i].uvIndex} />
            </Grid>
        </React.Fragment>
    );

    return dailies;
};

const createTrayIcon = (temperature, icon) => {
    const scale = window.devicePixelRatio;
    const size  = Constants.TRAY_ICON_SIZE;

    const canvas = document.createElement('canvas');
    canvas.width  = size * scale;
    canvas.height = size * scale;

    const context = canvas.getContext('2d');
    const image   = new Image(scale, scale);

    image.onload = () => {
        context.scale(scale, scale);
        context.drawImage(image, 0, 0, size * scale, size * scale, 0, 0, size, size);

        AppHelpers.send('refresh', {
            temperature,
            icon : canvas.toDataURL(),
        });
    };

    image.src = process.env.NODE_ENV === 'development' ? path.join(__dirname, '..', 'img', Preferences.isDarkMode() ? 'dark' : 'light', icon) : AppHelpers.pathToFileURL(path.join(AppHelpers.getGlobal('APP_DIR'), 'build', 'img', Preferences.isDarkMode() ? 'dark' : 'light', icon));
};

const HomeRoot = props => {
    const classes = useStyles();

    const [ lastRefreshTimestamp,            setLastRefreshTimestamp,       ] = usePersistentState(Preferences.getLastRefreshTimestamp(), Preferences.KEY_LAST_REFRESH_TIMESTAMP);
    const [ weather,                         setWeather,                    ] = usePersistentState(Preferences.getWeather(), Preferences.KEY_WEATHER);
    const [ backgroundImageUrl,              setBackgroundImageUrl,         ] = usePersistentState(Preferences.getBackgroundImageUrl(), Preferences.KEY_BACKGROUND_IMAGE_URL);
    const [ backgroundImageAuthor,           setBackgroundImageAuthor,      ] = usePersistentState(Preferences.getBackgroundImageAuthor(), Preferences.KEY_BACKGROUND_IMAGE_AUTHOR);
    const [ backgroundImageAuthorProfileUri, setBackgroundAuthorProfileUri, ] = usePersistentState(Preferences.getBackgroundImageAuthorProfileUrl(), Preferences.KEY_BACKGROUND_IMAGE_AUTHOR_PROFILE_URL);

    const { t, } = useTranslation();

    const createDummyCurrently = React.useCallback(() => (
        <Skeleton
            width={window.innerWidth}
            height={window.innerWidth / 2}
            variant='rect'
            animation='wave' />
    ), [ window.innerWidth, ]);

    const createDummyDailies = React.useCallback(count => {
        const dummyDailies = [];
        for (let i = 0; i < count; i++) dummyDailies.push(
            <Grid
                key={i}
                item>
                <Skeleton
                    variant='text'
                    animation='wave' />
                <Skeleton
                    variant='text'
                    animation='wave' />
                <Skeleton
                    width={48}
                    height={48}
                    variant='circle'
                    animation='wave' />
                <Skeleton
                    variant='text'
                    animation='wave' />
                <Skeleton
                    variant='text'
                    animation='wave' />
                <Skeleton
                    variant='text'
                    animation='wave' />
                <Skeleton
                    variant='text'
                    animation='wave' />
                <Skeleton
                    variant='text'
                    animation='wave' />
                <Skeleton
                    variant='text'
                    animation='wave' />
                <Skeleton
                    variant='text'
                    animation='wave' />
            </Grid>
        );

        return dummyDailies;
    }, []);

    React.useEffect(async () => {
        const location = Preferences.getSelectedLocation();

        if (shouldRefresh()) {
            try {
                const weatherResponse  = await WeatherApiClient.getWeather(Preferences.getWeatherProvider().id, location.latitude, location.longitude, Preferences.getForecastDays().value, Preferences.getForecastHours().value, Preferences.getLocale().value);
                const UnsplashResponse = await UnsplashApiClient.getRandomPhoto(`${DateTimeHelpers.getPartOfDay()} ${weatherResponse.currently.icon}`, window.innerWidth * 2, window.innerWidth);

                createTrayIcon(`${UnitHelpers.toTemperature(weatherResponse.currently.temperature, Preferences.getUnit().value, 0)}`, `${WeatherHelpers.getIcon(Preferences.getWeatherProvider().id, DateTimeHelpers.isDay(), weatherResponse.currently.icon)}.svg`);

                setLastRefreshTimestamp(Date.now());

                setBackgroundImageUrl(UnsplashResponse.urls.regular);
                setBackgroundImageAuthor(UnsplashResponse.user.name);
                setBackgroundAuthorProfileUri(UnsplashResponse.user.links.html);

                setWeather(weatherResponse);
            } catch (error) {
                handleError(error);
            }
        } else {
            createTrayIcon(`${UnitHelpers.toTemperature(weather.currently.temperature, Preferences.getUnit().value, 0)}`, `${WeatherHelpers.getIcon(Preferences.getWeatherProvider().id, DateTimeHelpers.isDay(), weather.currently.icon)}.svg`);
        }
    }, []);

    useInterval(refresh, Constants.UPDATE_INTERVAL);

    const dailies = weather ? createDailies(weather, Preferences.getForecastDays().value) : createDummyDailies(Preferences.getForecastDays().value);

    return (
        <Box overflow='none'>
            {!backgroundImageUrl && createDummyCurrently()}
            {backgroundImageUrl && (
                <Currently
                    backgroundImageUrl={backgroundImageUrl}
                    location={Preferences.getSelectedLocation()}
                    providerId={Preferences.getWeatherProvider().id}
                    unit={Preferences.getUnit().value}
                    iconId={weather?.currently?.icon}
                    summaryCurrently={weather?.currently?.summary}
                    summaryToday={weather?.daily[0]?.summary}
                    temperature={weather?.currently?.temperature}
                    temperatureHighPrefix={<FontIcon className='fas fa-thermometer-full' />}
                    temperatureHigh={weather?.daily[0]?.temperatureHigh}
                    temperatureLowPrefix={<FontIcon className='fas fa-thermometer-quarter' />}
                    temperatureLow={weather?.daily[0]?.temperatureLow}
                    humidityPrefix={<FontIcon className='fas fa-tint' />}
                    humidity={weather?.currently?.humidity}
                    windSpeedPrefix={<FontIcon className='fas fa-wind' />}
                    windSpeed={weather?.currently?.windSpeed}
                    uvIndexPrefix={<FontIcon className='fas fa-sun' />}
                    uvIndex={weather?.currently?.uvIndex}
                    onSelectLocation={() => props.history.push('/settings/locations')} />
            )}
            {!weather?.hourly && createDummyCurrently()}
            {weather?.hourly && (
                <Hourly
                    className={classes.hourly}
                    size={{
                        width  : window.innerWidth,
                        height : window.innerWidth / 2,
                    }}
                    providerId={Preferences.getWeatherProvider().id}
                    unit={Preferences.getUnit().value}
                    data={weather.hourly}
                    title={t('8-hour forecast')}
                    temperaturePrefix='🌡'
                    humidityPrefix='💧'
                    precipPrefix='🌧'
                    windSpeedPrefix='🌬'
                    uvIndexPrefix='🌞'
                    forecast={Preferences.getForecastType().value}
                    timeFormat={Preferences.isMilitaryTime() ? 'HH' : 'ha'} />

            )}
            <Divider />
            {Preferences.getForecastLayout().value === Constants.FORECAST_LAYOUTS[0].value && dailies.map((daily, index) => (
                <>
                    {index > 0 && (
                        <Divider orientation={Constants.FORECAST_LAYOUTS[0].value} />
                    )}
                    <div key={index}>{daily}</div>
                </>
            ))}
            {Preferences.getForecastLayout().value === Constants.FORECAST_LAYOUTS[1].value && (
                <Grid
                    container
                    alignItems='center'
                    justifyContent='space-evenly'>
                    {weather && createDailies(weather, Preferences.getForecastDays().value)}
                    {!weather && createDummyDailies(Preferences.getForecastDays().value)}
                </Grid>
            )}
            <Divider />
            <Grid
                container
                alignItems='center'
                justifyContent='space-between'>
                <Grid
                    item
                    xs={10}>
                    <Box
                        paddingLeft={1}
                        paddingRight={1}>
                        <Action
                            tooltip={`${t('Last updated: ')}${weather?.currently ? moment(new Date(Number(lastRefreshTimestamp))).format('LLLL') : t('Never')}`}
                            icon={
                                <Schedule
                                    role='img'
                                    fontSize='small' />
                            }
                            size='small'
                            onClick={refresh} />
                        <Action
                            tooltip={`${t('Photo by')} ${backgroundImageAuthor} / Unsplash`}
                            icon={
                                <InfoOutlined
                                    role='img'
                                    fontSize='small' />
                            }
                            size='small'
                            onClick={() => AppHelpers.openURL(backgroundImageAuthorProfileUri)} />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={2}>
                    <Box
                        paddingLeft={1}
                        paddingRight={1}>
                        <Action
                            tooltip='Settings'
                            icon={
                                <Settings
                                    role='img'
                                    fontSize='small' />
                            }
                            size='small'
                            onClick={() => props.history.push('/settings')} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export const Home = withRouter(HomeRoot);

HomeRoot.propTypes = {
    history : PropTypes.object.isRequired,
};
