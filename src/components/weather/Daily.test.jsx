import React from 'react';

import { render, screen, } from '../../utils/TestHelpers';
import { Constants, } from '../../Constants';
import { Daily, } from './Daily';

const date              = new Date(1587628337);
const summary           = 'Partly Cloudy';
const iconId            = 'partly-cloudy-night';
const providerId        = Constants.WEATHER_PROVIDERS[0].id;
const unit              = Constants.UNITS[0].value;
const temperatureHigh   = 29.7;
const temperatureLow    = 22.4;
const humidity          = 0.77;
const precipProbability = 0.48;
const precipIntensity   = 0.2;
const windSpeed         = 7;
const uvIndex           = 4;

const componentHorizontal = (
    <Daily
        orientation='horizontal'
        date={date}
        summary={summary}
        providerId={providerId}
        unit={unit}
        iconId={iconId}
        temperatureHigh={temperatureHigh}
        temperatureLow={temperatureLow}
        humidity={humidity}
        precipProbability={precipProbability}
        precipIntensity={precipIntensity}
        windSpeed={windSpeed}
        uvIndex={uvIndex} />
);

const componentVertical = (
    <Daily
        orientation='vertical'
        date={date}
        summary={summary}
        providerId={providerId}
        unit={unit}
        iconId={iconId}
        temperatureHigh={temperatureHigh}
        temperatureLow={temperatureLow}
        humidity={humidity}
        precipProbability={precipProbability}
        precipIntensity={precipIntensity}
        windSpeed={windSpeed}
        uvIndex={uvIndex} />
);

describe('<Daily />', () => {
    it('renders horizontal orientation correctly', () => {
        render(componentHorizontal);
        expect(screen.getByText('30°C')).toBeInTheDocument();
    });

    it('renders vertical orientation correctly', () => {
        render(componentVertical);
        expect(screen.getByText('30°C')).toBeInTheDocument();
    });
});
