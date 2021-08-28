import React from 'react';

import { Currently, } from '../../components/weather/Currently';
import { Constants, } from '../../Constants';

export default {
    title     : 'Weather/Currently',
    component : Currently,
    argTypes  : {
        providerId      : {
            options : Constants.WEATHER_PROVIDERS.map(provider => provider.id),
            control : {
                type : 'select',
            },
        },
        unit            : {
            options : Constants.UNITS.map(unit => unit.value),
            control : {
                type : 'select',
            },
        },
        temperature     : {
            control : {
                type : 'number',
            },
        },
        temperatureHigh : {
            control : {
                type : 'number',
            },
        },
        temperatureLow  : {
            control : {
                type : 'number',
            },
        },
        humidity        : {
            control : {
                type : 'number',
            },
        },
        windSpeed       : {
            control : {
                type : 'number',
            },
        },
        uvIndex         : {
            control : {
                type : 'number',
            },
        },
        noShadow        : {
            control : {
                type : 'boolean',
            },
        },
    },
};

const Template = args => <Currently {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    location         : 'Hong Kong',
    providerId       : Constants.WEATHER_PROVIDERS[0].id,
    unit             : Constants.UNITS[0].value,
    iconId           : 'partly-cloudy-night',
    summaryCurrently : 'Partly Cloudy',
    summaryToday     : 'No precipitation throughout the week',
    temperature      : 28.3,
    temperatureHigh  : 29.7,
    temperatureLow   : 22.4,
    humidity         : 0.77,
    windSpeed        : 7,
    uvIndex          : 4,
};
