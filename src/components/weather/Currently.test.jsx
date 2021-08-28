import { Box, } from '@material-ui/core';
import React from 'react';

import { Location } from '../../models/Location';
import { render, screen, } from '../../utils/TestHelpers';
import { Constants, } from '../../Constants';
import { Currently, } from './Currently';

const width            = 200;
const height           = 100;
const location         = new Location(34.0522, 118.2437, 'Los Angeles');
const providerId       = Constants.WEATHER_PROVIDERS[0].id;
const unit             = Constants.UNITS[0].value;
const summaryCurrently = 'Partly Cloudy';
const summaryToday     = 'No precipitation throughout the week';
const iconId           = 'partly-cloudy-night';
const temperature      = 28.3;
const temperatureHigh  = 29.7;
const temperatureLow   = 22.4;
const humidity         = 0.77;
const windSpeed        = 7;
const uvIndex          = 4;

const component = (
    <Box
        width={width}
        height={height}>
        <Currently
            location={location}
            providerId={providerId}
            unit={unit}
            summaryCurrently={summaryCurrently}
            summaryToday={summaryToday}
            iconId={iconId}
            temperature={temperature}
            temperatureHigh={temperatureHigh}
            temperatureLow={temperatureLow}
            humidity={humidity}
            windSpeed={windSpeed}
            uvIndex={uvIndex} />
    </Box>
);

describe('<Currently />', () => {
    it('renders correctly', () => {
        render(component);
        expect(screen.getByText(location.displayName)).toBeInTheDocument();
    });
});
