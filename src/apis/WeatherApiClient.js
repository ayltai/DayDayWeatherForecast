import { Constants, } from '../Constants';
import { AccuWeatherApiClient, } from './AccuWeatherApiClient';
import { OpenWeatherMapApiClient, } from './OpenWeatherMapApiClient';

export const WeatherApiClient = {};

WeatherApiClient.getWeather = async (providerId, latitude, longitude, days, hours, locale) => {
    if (providerId === Constants.WEATHER_PROVIDERS[0].id) return OpenWeatherMapApiClient.getWeather(latitude, longitude, days, hours, locale);
    if (providerId === Constants.WEATHER_PROVIDERS[1].id) return AccuWeatherApiClient.getWeather(latitude, longitude, days, hours, locale);

    throw new Error(`Unrecognized weather provider (ID = ${providerId})`);
};
