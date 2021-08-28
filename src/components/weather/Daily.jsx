import { Box, Grid, Tooltip, } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { DateTimeHelpers, } from '../../utils/DateTimeHelpers';
import { NumberFormatHelpers, } from '../../utils/NumberFormatHelpers';
import { StringHelpers } from '../../utils/StringHelpers';
import { UnitHelpers, } from '../../utils/UnitHelpers';
import { WeatherHelpers, } from '../../utils/WeatherHelpers';
import { Constants, } from '../../Constants';
import { Label, } from '../Label';
import { Temperature, } from '../Temperature';

const StyledTemperature = props => (
    <Temperature
        align='center'
        variant='body2'
        unit={props.unit}
        prefix={props.prefix}
        noShadow={props.noShadow}
        noTooltip
        noWrap>
        {props.temperature}
    </Temperature>
);

StyledTemperature.propTypes = {
    prefix      : PropTypes.node,
    unit        : PropTypes.oneOf(Constants.UNITS.map(unit => unit.value)),
    noShadow    : PropTypes.bool,
    temperature : PropTypes.number,
};

export const Daily = props => {
    const summary = StringHelpers.capitalize(props.summary);

    let i = 0;

    const date = (
        <Label
            key={i++}
            align='center'
            variant='body2'
            noShadow={props.noShadow}
            noWrap>
            {moment(props.date).format('ddd')}
        </Label>
    );

    const icon = (
        <Label
            key={i++}
            align='center'
            variant='h4'
            noShadow={props.noShadow}
            noWrap>
            <i className={`wi ${WeatherHelpers.getIcon(props.providerId, DateTimeHelpers.isDay(), props.iconId) || 'wi-na'}`} />
        </Label>
    );

    const temperatureHigh = (
        <StyledTemperature
            key={i++}
            unit={props.unit}
            prefix={props.temperatureHighPrefix}
            noShadow={props.noShadow}
            temperature={props.temperatureHigh} />
    );

    const temperatureLow = (
        <StyledTemperature
            key={i++}
            unit={props.unit}
            prefix={props.temperatureLowPrefix}
            noShadow={props.noShadow}
            temperature={props.temperatureLow} />
    );

    const precip = (
        <Grid
            key={i++}
            container
            justifyContent='center'>
            <Label
                align='center'
                variant='body2'
                noShadow={props.noShadow}
                noWrap>
                {props.precipPrefix}
            </Label>
            <Label
                align='center'
                variant='body2'
                noShadow={props.noShadow}
                noWrap>
                <Box marginLeft={props.precipPrefix ? 1 : 0}>{`${Math.round(props.precipProbability * 100)}%`}</Box>
            </Label>
        </Grid>
    );

    const blocks = [];

    if (props.orientation === 'horizontal') {
        blocks.push(
            <Grid
                key={i++}
                item
                xs={2}>
                {date}
                {precip}
            </Grid>
        );

        blocks.push(
            <Grid
                key={i++}
                item
                xs={2}>
                {icon}
            </Grid>
        );

        blocks.push(
            <Grid
                key={i++}
                item
                xs={6}>
                <Label
                    align='left'
                    variant='caption'
                    noShadow={props.noShadow}
                    noWrap>
                    {summary}
                </Label>
            </Grid>
        );

        blocks.push(
            <Grid
                key={i}
                item
                xs={2}>
                {temperatureHigh}
                {temperatureLow}
            </Grid>
        );
    } else if (props.orientation === 'vertical') {
        blocks.push(date);
        blocks.push(icon);
        blocks.push(temperatureHigh);
        blocks.push(temperatureLow);
        blocks.push(precip);
    }

    return (
        <Tooltip
            placeholder='top'
            title={
                <React.Fragment>
                    {moment(props.date).format('LL')}<br />
                    {summary}<br />
                    {props.temperaturePrefix}{`${props.temperaturePrefix ? ' ' : ''}${UnitHelpers.toTemperature(props.temperatureLow, props.unit)} — ${UnitHelpers.toTemperature(props.temperatureHigh, props.unit)}`}<br />
                    {props.precipPrefix}{`${props.precipPrefix ? ' ' : ''}${NumberFormatHelpers.toFixed(props.precipProbability * 100, 0)}% ${NumberFormatHelpers.toFixed(props.precipIntensity)}mm`}<br />
                    {props.humidity && (
                        <React.Fragment>
                            {props.humidityPrefix}{`${props.humidityPrefix ? ' ' : ''}${NumberFormatHelpers.toFixed(props.humidity * 100, 0)}%`}<br />
                        </React.Fragment>
                    )}
                    {props.windSpeedPrefix}{`${props.windSpeedPrefix ? ' ' : ''}${UnitHelpers.toWindSpeed(props.windSpeed, props.unit, 0)}`}<br />
                    {props.uvIndexPrefix}{`${props.uvIndexPrefix ? ' ' : ''}${NumberFormatHelpers.toFixed(props.uvIndex, 0)}`}
                </React.Fragment>
            }
        >
            <Grid
                container
                direction={props.orientation === 'vertical' ? 'column' : 'row'}
                alignItems='center'
                justifyContent='space-evenly'>
                {blocks}
            </Grid>
        </Tooltip>
    );
};

Daily.propTypes = {
    orientation           : PropTypes.oneOf([
        'horizontal',
        'vertical',
    ]),
    date                  : PropTypes.instanceOf(Date),
    providerId            : PropTypes.oneOf(Constants.WEATHER_PROVIDERS.map(provider => provider.id)),
    unit                  : PropTypes.oneOf(Constants.UNITS.map(unit => unit.value)),
    summary               : PropTypes.string,
    iconId                : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    temperaturePrefix     : PropTypes.node,
    temperatureHighPrefix : PropTypes.node,
    temperatureHigh       : PropTypes.number,
    temperatureLowPrefix  : PropTypes.node,
    temperatureLow        : PropTypes.number,
    humidityPrefix        : PropTypes.node,
    humidity              : PropTypes.number,
    precipPrefix          : PropTypes.node,
    precipProbability     : PropTypes.number,
    precipIntensity       : PropTypes.number,
    windSpeedPrefix       : PropTypes.node,
    windSpeed             : PropTypes.number,
    uvIndexPrefix         : PropTypes.node,
    uvIndex               : PropTypes.number,
    noShadow              : PropTypes.bool,
};

Daily.defaultProps = {
    orientation : 'vertical',
    date        : Date.now(),
};
