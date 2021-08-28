import { WebClient, } from '../utils/WebClient';

const toCurrentlyWeather = response => ({
    summary         : response[0].WeatherText,
    icon            : response[0].WeatherIcon,
    temperature     : response[0].Temperature.Metric.Value,
    humidity        : response[0].RelativeHumidity / 100,
    precipIntensity : response[0].PrecipitationSummary.Precipitation.Metric.Value,
    windSpeed       : response[0].Wind.Speed.Metric.Value,
    uvIndex         : response[0].UVIndex,
});

const toHourlyWeather = (response, hours) => {
    const weathers = [];

    for (let i = 0; i < hours; i++) {
        weathers.push({
            time              : response[i].EpochDateTime * 1000,
            icon              : response[i].WeatherIcon,
            temperature       : response[i].Temperature.Value,
            humidity          : response[i].RelativeHumidity / 100,
            precipProbability : response[i].PrecipitationProbability / 100,
            precipIntensity   : response[i].TotalLiquid.Value,
            windSpeed         : response[i].Wind.Speed.Value,
            uvIndex           : response[i].UVIndex,
        });
    }

    return weathers;
};

const toDailyWeather = (response, days) => {
    const weathers = [];

    for (let i = 1; i < days + 1; i++) {
        weathers.push({
            time              : response.DailyForecasts[i].EpochDateTime * 1000,
            summary           : response.DailyForecasts[i].Day.LongPhrase,
            icon              : response.DailyForecasts[i].Day.Icon,
            temperatureHigh   : response.DailyForecasts[i].Temperature.Maximum.Value,
            temperatureLow    : response.DailyForecasts[i].Temperature.Minimum.Value,
            precipProbability : response.DailyForecasts[i].Day.PrecipitationProbability / 100,
            precipIntensity   : response.DailyForecasts[i].Day.TotalLiquid.Value,
            windSpeed         : response.DailyForecasts[i].Day.Wind.Speed.Value,
        });
    }

    return weathers;
};

const formatLocale = locale => locale.toLowerCase();

const getLocationKey = async (latitude, longitude) => (await WebClient.get(`${process.env.REACT_APP_API_ENDPOINT_ACCUWEATHER}/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEY_ACCUWEATHER}&q=${latitude}%2C${longitude}`)).Key;

const getCurrentlyWeather = async (locationKey, locale) => toCurrentlyWeather(await WebClient.get(`${process.env.REACT_APP_API_ENDPOINT_ACCUWEATHER}/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY_ACCUWEATHER}&details=true&language=${formatLocale(locale)}`));

const getHourlyWeather = async (locationKey, hours, locale) => toHourlyWeather(await WebClient.get(`${process.env.REACT_APP_API_ENDPOINT_ACCUWEATHER}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${process.env.REACT_APP_API_KEY_ACCUWEATHER}&details=true&metric=true&language=${formatLocale(locale)}`), hours);

const getDailyWeather = async (locationKey, days, locale) => toDailyWeather(await WebClient.get(`${process.env.REACT_APP_API_ENDPOINT_ACCUWEATHER}/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_API_KEY_ACCUWEATHER}&details=true&metric=true&language=${formatLocale(locale)}`), days);

export const AccuWeatherApiClient = {};

AccuWeatherApiClient.getWeather = async (latitude, longitude, days = 4, hours = 12, locale = 'en-US') => {
    const locationKey = await getLocationKey(latitude, longitude);
    const currently   = await getCurrentlyWeather(locationKey, locale);
    const hourly      = await getHourlyWeather(locationKey, Math.min(12, Math.max(1, hours)), locale);
    const daily       = await getDailyWeather(locationKey, Math.min(4, Math.max(1, days)), locale);

    return {
        currently,
        hourly,
        daily,
    };
};
