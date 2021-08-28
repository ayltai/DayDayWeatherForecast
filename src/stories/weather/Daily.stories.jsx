import { Opacity, } from '@material-ui/icons';
import React from 'react';

import { Daily, } from '../../components/weather/Daily';
import { FontIcon, } from '../../components/FontIcon';
import { Constants, } from '../../Constants';

export default {
    title     : 'Weather/Daily',
    component : Daily,
    argTypes  : {
        providerId  : {
            options : Constants.WEATHER_PROVIDERS.map(provider => provider.id),
            control : {
                type : 'select',
            },
        },
        unit        : {
            options : Constants.UNITS.map(unit => unit.value),
            control : {
                type : 'select',
            },
        },
        orientation : {
            options : [
                'horizontal',
                'vertical',
            ],
            control : {
                type : 'select',
            },
        },
    },
};

const Template = args => <Daily {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    providerId        : Constants.WEATHER_PROVIDERS[0].id,
    unit              : Constants.UNITS[0].value,
    date              : new Date(1587628337000),
    summary           : 'Partly Cloudy',
    iconId            : 'partly-cloudy-night',
    temperatureHigh   : 29.7,
    temperatureLow    : 22.4,
    humidity          : 0.77,
    precipProbability : 0.48,
    precipIntensity   : 0.2,
    windSpeed         : 7,
    uvIndex           : 4,
};

export const WithPrefix = Template.bind({});
WithPrefix.args = {
    ...Basic.args,
    temperatureHighPrefix : <FontIcon className='fas fa-thermometer-full' />,
    temperatureLowPrefix  : <FontIcon className='fas fa-thermometer-quarter' />,
    humidityPrefix        : <Opacity fontSize='small' />,
    precipPrefix          : <FontIcon className='fas fa-cloud-rain' />,
    windSpeedPrefix       : <FontIcon className='fas fa-wind' />,
    uvIndexPrefix         : <FontIcon className='fas fa-sun' />,
};

export const Horizontal = Template.bind({});
Horizontal.args = {
    ...WithPrefix.args,
    orientation : 'horizontal',
};
