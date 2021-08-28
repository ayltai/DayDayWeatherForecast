import { WebClient, } from '../utils/WebClient';

const parseResponse = (weather, data) => {
    weather.time              = data.dt * 1000;
    weather.summary           = data.weather[0].description;
    weather.icon              = data.weather[0].id;
    weather.humidity          = data.humidity / 100;
    weather.precipProbability = data.pop;
    weather.windSpeed         = Math.round(data.wind_speed * 1000 / 60 / 60);
};

const toCurrentlyWeather = response => ({
    summary         : response.current.weather[0].description,
    icon            : response.current.weather[0].id,
    temperature     : response.current.temp,
    humidity        : response.current.humidity / 100,
    precipIntensity : (response.current.rain ? response.current.rain['1h'] : 0) + (response.current.snow ? response.current.snow['1h'] : 0),
    windSpeed       : Math.round(response.current.wind_speed * 1000 / 60 / 60),
    uvIndex         : Math.round(response.current.uvi),
});

const toHourlyWeather = (response, hours) => {
    const weathers = [];

    for (let i = 0; i < hours; i++) {
        const weather = {
            temperature     : response.hourly[i].temp,
            precipIntensity : (response.hourly[i].rain ? response.hourly[i].rain['1h'] : 0) + (response.hourly[i].snow ? response.hourly[i].snow['1h'] : 0),
        };

        parseResponse(weather, response.hourly[i]);

        weathers.push(weather);
    }

    return weathers;
};

const toDailyWeather = (response, days) => {
    const weathers = [];

    for (let i = 1; i < days + 1; i++) {
        const weather = {
            temperatureHigh : response.daily[i].temp.max,
            temperatureLow  : response.daily[i].temp.min,
            precipIntensity : (response.daily[i].rain ? response.daily[i].rain : 0) + (response.daily[i].snow ? response.daily[i].snow : 0),
            uvIndex         : Math.round(response.daily[i].uvi),
        };

        parseResponse(weather, response.daily[i]);

        weathers.push(weather);
    }

    return weathers;
};

const formatLocale = locale => {
    if (locale === 'zh-TW') return 'zh_tw';
    if (locale === 'zh-CN') return 'zh_cn';
    if (locale === 'pt-BR') return 'pt_br';

    return locale.substr(0, 2);
};

export const OpenWeatherMapApiClient = {};

OpenWeatherMapApiClient.getWeather = async (latitude, longitude, days = 6, hours = 48, locale = 'en-US') => {
    const response  = await WebClient.get(`${process.env.REACT_APP_API_ENDPOINT_OPENWEATHERMAP}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY_OPENWEATHERMAP}&lang=${formatLocale(locale)}`);
    const currently = toCurrentlyWeather(response);
    const hourly    = toHourlyWeather(response, hours);
    const daily     = toDailyWeather(response, days);

    return {
        currently,
        hourly,
        daily,
    };
};
