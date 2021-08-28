import { Box, Grid, makeStyles, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { Location } from '../../models/Location';
import { Preferences } from '../../models/Preferences';
import { DateTimeHelpers, } from '../../utils/DateTimeHelpers';
import { NumberFormatHelpers, } from '../../utils/NumberFormatHelpers';
import { StringHelpers, } from '../../utils/StringHelpers';
import { UnitHelpers, } from '../../utils/UnitHelpers';
import { WeatherHelpers, } from '../../utils/WeatherHelpers';
import { Constants, } from '../../Constants';
import { Label, } from '../Label';
import { Temperature, } from '../Temperature';

const useStyles = makeStyles(theme => ({
    background : {
        position        : 'absolute',
        width           : 'calc(100% + 6px)',
        height          : '180px',
        margin          : '-3px',
        backgroundImage : props => `url(${props.backgroundImageUrl})`,
        backgroundSize  : 'cover',
        filter          : props => `${props.backgroundBlurred ? 'blur(2px)' : ''}${props.backgroundBlurred && props.backgroundDarken ? ' ' : ''}${props.backgroundDarken ? 'brightness(0.85)' : ''}${!props.backgroundBlurred && !props.backgroundDarken ? 'none' : ''}`,
        padding         : theme.spacing(0.5),
        zIndex          : -1,
    },
    padding    : {
        paddingTop : theme.spacing(1),
    },
}));

const StyledLabel = props => (
    <Label
        align='center'
        variant='body2'
        tooltip={props.children}
        noShadow={props.noShadow}
        noWrap>
        {props.children}
    </Label>
);

StyledLabel.propTypes = {
    children : PropTypes.node,
    noShadow : PropTypes.bool,
};

const SmallTemperature = props => (
    <Temperature
        align='center'
        variant={props.variant}
        prefix={props.prefix}
        unit={props.unit}
        noShadow={props.noShadow}
        noWrap>
        {props.temperature}
    </Temperature>
);

SmallTemperature.propTypes = {
    variant     : PropTypes.oneOf([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'button',
        'overline',
        'srOnly',
        'inherit',
    ]),
    prefix      : PropTypes.node,
    unit        : PropTypes.oneOf(Constants.UNITS.map(unit => unit.value)),
    noShadow    : PropTypes.bool,
    temperature : PropTypes.number,
};

SmallTemperature.defaultProps = {
    variant : 'body2',
};

const LargeTemperature = props => (
    <SmallTemperature
        variant='h4'
        prefix={props.prefix}
        unit={props.unit}
        noShadow={props.noShadow}
        temperature={props.temperature} />
);

LargeTemperature.propTypes = {
    prefix      : PropTypes.node,
    unit        : PropTypes.oneOf(Constants.UNITS.map(unit => unit.value)),
    noShadow    : PropTypes.bool,
    temperature : PropTypes.number,
};

export const Currently = props => {
    const classes = useStyles({
        backgroundImageUrl : props.backgroundImageUrl,
        backgroundBlurred  : Preferences.isBackgroundBlurred(),
        backgroundDarken   : Preferences.isBackgroundDarken(),
    });

    const summaryCurrently = StringHelpers.capitalize(props.summaryCurrently);
    const summaryToday     = StringHelpers.capitalize(props.summaryToday);
    const humidity         = NumberFormatHelpers.toFixed(props.humidity * 100, 0);

    const { t, } = useTranslation();

    return (
        <Box
            height={180}
            overflow='hidden'>
            <div className={classes.background} />
            <Box
                marginTop={1}
                marginLeft={1}
                marginRight={1}>
                <StyledLabel noShadow={props.noShadow}>{props.location.displayName}</StyledLabel>
                <StyledLabel noShadow={props.noShadow}>{summaryCurrently}</StyledLabel>
            </Box>
            <Grid
                container
                alignItems='center'
                justifyContent='space-around'>
                <Grid
                    item
                    xs={4}>
                    <LargeTemperature
                        unit={props.unit}
                        noShadow={props.noShadow}
                        temperature={props.temperature} />
                    <Grid
                        container
                        alignItems='center'
                        justifyContent='center'>
                        <Label
                            align='center'
                            variant='body2'
                            tooltip={`${humidity}%`}
                            noShadow={props.noShadow}
                            noWrap>
                            {props.humidityPrefix}
                        </Label>
                        <Label
                            align='center'
                            variant='body2'
                            tooltip={`${humidity}%`}
                            noShadow={props.noShadow}
                            noWrap>
                            <Box marginLeft={props.humidityPrefix ? 1 : 0}>{`${humidity}%`}</Box>
                        </Label>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <Label
                        align='center'
                        variant='h2'
                        tooltip={`${t('Wind')}: ${UnitHelpers.toWindSpeed(props.windSpeed, props.unit)}, ${t('UV')}: ${NumberFormatHelpers.toFixed(props.uvIndex, 0)}`}
                        noShadow={props.noShadow}>
                        <i className={`wi ${WeatherHelpers.getIcon(props.providerId, DateTimeHelpers.isDay(), props.iconId) || 'wi-na'}`} />
                    </Label>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <SmallTemperature
                        prefix={props.temperatureHighPrefix}
                        unit={props.unit}
                        noShadow={props.noShadow}
                        temperature={props.temperatureHigh} />
                    <SmallTemperature
                        prefix={props.temperatureLowPrefix}
                        unit={props.unit}
                        noShadow={props.noShadow}
                        temperature={props.temperatureLow} />
                </Grid>
            </Grid>
            <Label
                align='center'
                variant='body2'
                tooltip={summaryToday}
                noShadow={props.noShadow}
                noWrap>
                {summaryToday}
            </Label>
        </Box>
    );
};

Currently.propTypes = {
    backgroundImageUrl    : PropTypes.string,
    location              : PropTypes.instanceOf(Location),
    providerId            : PropTypes.oneOf(Constants.WEATHER_PROVIDERS.map(provider => provider.id)),
    unit                  : PropTypes.oneOf(Constants.UNITS.map(unit => unit.value)),
    summaryCurrently      : PropTypes.string,
    summaryToday          : PropTypes.string,
    iconId                : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    temperature           : PropTypes.number,
    temperatureHighPrefix : PropTypes.node,
    temperatureHigh       : PropTypes.number,
    temperatureLowPrefix  : PropTypes.node,
    temperatureLow        : PropTypes.number,
    humidityPrefix        : PropTypes.node,
    humidity              : PropTypes.number,
    windSpeedPrefix       : PropTypes.node,
    windSpeed             : PropTypes.number,
    uvIndexPrefix         : PropTypes.node,
    uvIndex               : PropTypes.number,
    noShadow              : PropTypes.bool,
};
