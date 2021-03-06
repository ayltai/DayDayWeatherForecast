export const WeatherHelpers = {};

const DAY_ICONS = [
    {
        200 : 'wi-day-thunderstorm',
        201 : 'wi-day-thunderstorm',
        202 : 'wi-day-thunderstorm',
        210 : 'wi-day-thunderstorm',
        211 : 'wi-day-thunderstorm',
        212 : 'wi-day-thunderstorm',
        221 : 'wi-day-thunderstorm',
        230 : 'wi-day-thunderstorm',
        231 : 'wi-day-thunderstorm',
        232 : 'wi-day-thunderstorm',
        300 : 'wi-day-rain',
        301 : 'wi-day-rain',
        302 : 'wi-day-rain',
        310 : 'wi-day-rain',
        311 : 'wi-day-rain',
        312 : 'wi-day-rain',
        313 : 'wi-day-rain',
        314 : 'wi-day-rain',
        321 : 'wi-day-rain',
        500 : 'wi-day-rain',
        501 : 'wi-day-rain',
        502 : 'wi-day-rain',
        503 : 'wi-day-rain',
        504 : 'wi-day-rain',
        511 : 'wi-day-rain',
        520 : 'wi-day-rain',
        521 : 'wi-day-rain',
        522 : 'wi-day-rain',
        531 : 'wi-day-rain',
        600 : 'wi-day-snow',
        601 : 'wi-day-snow',
        602 : 'wi-day-snow',
        611 : 'wi-day-sleet',
        612 : 'wi-day-sleet',
        613 : 'wi-day-snow',
        615 : 'wi-day-snow',
        616 : 'wi-day-snow',
        620 : 'wi-day-snow',
        621 : 'wi-day-snow',
        622 : 'wi-day-snow',
        701 : 'wi-day-fog',
        711 : 'wi-smoke',
        721 : 'wi-day-fog',
        731 : 'wi-day-fog',
        741 : 'wi-day-fog',
        751 : 'wi-sandstorm',
        761 : 'wi-sandstorm',
        762 : 'wi-sandstorm',
        771 : 'wi-day-windy',
        781 : 'wi-tornado',
        800 : 'wi-day-sunny',
        801 : 'wi-day-cloudy',
        802 : 'wi-day-cloudy',
        803 : 'wi-day-cloudy',
        804 : 'wi-day-cloudy',
    },
    {
        1  : 'wi-day-sunny',
        2  : 'wi-day-sunny',
        3  : 'wi-day-cloudy',
        4  : 'wi-day-cloudy',
        5  : 'wi-day-fog',
        6  : 'wi-cloudy',
        7  : 'wi-day-cloudy',
        8  : 'wi-day-cloudy',
        11 : 'wi-day-fog',
        12 : 'wi-day-rain',
        13 : 'wi-day-rain',
        14 : 'wi-day-rain',
        15 : 'wi-day-thunderstorm',
        16 : 'wi-day-thunderstorm',
        17 : 'wi-day-thunderstorm',
        18 : 'wi-day-rain',
        19 : 'wi-day-rain',
        20 : 'wi-day-cloudy',
        21 : 'wi-day-cloudy',
        22 : 'wi-day-snow',
        23 : 'wi-day-snow',
        24 : 'wi-day-snow',
        25 : 'wi-day-sleet',
        26 : 'wi-day-rain',
        29 : 'wi-day-rain',
        30 : 'wi-day-sunny',
        31 : 'wi-day-cloudy',
        32 : 'wi-day-windy',
        33 : 'wi-night-clear',
        34 : 'wi-night-clear',
        35 : 'wi-night-alt-cloudy',
        36 : 'wi-night-alt-cloudy',
        37 : 'wi-night-fog',
        38 : 'wi-night-alt-cloudy',
        39 : 'wi-night-alt-rain',
        40 : 'wi-night-alt-rain',
        41 : 'wi-night-alt-thunderstorm',
        42 : 'wi-night-alt-thunderstorm',
        43 : 'wi-night-alt-rain',
        44 : 'wi-night-alt-snow',
    },
];

const NIGHT_ICONS = [
    {
        200 : 'wi-night-alt-thunderstorm',
        201 : 'wi-night-alt-thunderstorm',
        202 : 'wi-night-alt-thunderstorm',
        210 : 'wi-night-alt-thunderstorm',
        211 : 'wi-night-alt-thunderstorm',
        212 : 'wi-night-alt-thunderstorm',
        221 : 'wi-night-alt-thunderstorm',
        230 : 'wi-night-alt-thunderstorm',
        231 : 'wi-night-alt-thunderstorm',
        232 : 'wi-night-alt-thunderstorm',
        300 : 'wi-night-alt-rain',
        301 : 'wi-night-alt-rain',
        302 : 'wi-night-alt-rain',
        310 : 'wi-night-alt-rain',
        311 : 'wi-night-alt-rain',
        312 : 'wi-night-alt-rain',
        313 : 'wi-night-alt-rain',
        314 : 'wi-night-alt-rain',
        321 : 'wi-night-alt-rain',
        500 : 'wi-night-alt-rain',
        501 : 'wi-night-alt-rain',
        502 : 'wi-night-alt-rain',
        503 : 'wi-night-alt-rain',
        504 : 'wi-night-alt-rain',
        511 : 'wi-night-alt-rain',
        520 : 'wi-night-alt-rain',
        521 : 'wi-night-alt-rain',
        522 : 'wi-night-alt-rain',
        531 : 'wi-night-alt-rain',
        600 : 'wi-night-alt-snow',
        601 : 'wi-night-alt-snow',
        602 : 'wi-night-alt-snow',
        611 : 'wi-night-alt-sleet',
        612 : 'wi-night-alt-sleet',
        613 : 'wi-night-alt-snow',
        615 : 'wi-night-alt-snow',
        616 : 'wi-night-alt-snow',
        620 : 'wi-night-alt-snow',
        621 : 'wi-night-alt-snow',
        622 : 'wi-night-alt-snow',
        701 : 'wi-night-fog',
        711 : 'wi-smoke',
        721 : 'wi-night-fog',
        731 : 'wi-night-fog',
        741 : 'wi-night-fog',
        751 : 'wi-sandstorm',
        761 : 'wi-sandstorm',
        762 : 'wi-sandstorm',
        771 : 'wi-night-alt-cloudy-windy',
        781 : 'wi-tornado',
        800 : 'wi-night-clear',
        801 : 'wi-night-alt-cloudy',
        802 : 'wi-night-alt-cloudy',
        803 : 'wi-night-alt-cloudy',
        804 : 'wi-night-alt-cloudy',
    },
    {
        1  : 'wi-day-sunny',
        2  : 'wi-day-sunny',
        3  : 'wi-day-cloudy',
        4  : 'wi-day-cloudy',
        5  : 'wi-day-fog',
        6  : 'wi-cloudy',
        7  : 'wi-night-alt-cloudy',
        8  : 'wi-night-alt-cloudy',
        11 : 'wi-night-fog',
        12 : 'wi-night-alt-rain',
        13 : 'wi-day-rain',
        14 : 'wi-day-rain',
        15 : 'wi-night-alt-thunderstorm',
        16 : 'wi-day-thunderstorm',
        17 : 'wi-day-thunderstorm',
        18 : 'wi-night-alt-rain',
        19 : 'wi-night-alt-rain',
        20 : 'wi-day-cloudy',
        21 : 'wi-day-cloudy',
        22 : 'wi-night-alt-snow',
        23 : 'wi-day-snow',
        24 : 'wi-night-alt-snow',
        25 : 'wi-night-alt-sleet',
        26 : 'wi-night-alt-rain',
        29 : 'wi-night-alt-rain',
        30 : 'wi-night-clear',
        31 : 'wi-night-alt-cloudy',
        32 : 'wi-night-alt-cloudy-windy',
        33 : 'wi-night-clear',
        34 : 'wi-night-clear',
        35 : 'wi-night-alt-cloudy',
        36 : 'wi-night-alt-cloudy',
        37 : 'wi-night-fog',
        38 : 'wi-night-alt-cloudy',
        39 : 'wi-night-alt-rain',
        40 : 'wi-night-alt-rain',
        41 : 'wi-night-alt-thunderstorm',
        42 : 'wi-night-alt-thunderstorm',
        43 : 'wi-night-alt-rain',
        44 : 'wi-night-alt-snow',
    },
];

WeatherHelpers.getIcon = (providerId, isDay, iconId) => isDay ? DAY_ICONS[providerId][iconId] : NIGHT_ICONS[providerId][iconId];
