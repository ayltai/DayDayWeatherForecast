import { Box, Grid, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { UnitHelpers, } from '../utils/UnitHelpers';
import { Constants } from '../Constants';
import { Label, } from './Label';

const TemperatureRoot = props => {
    const temperature = Number(props.children || 0);
    const unit        = props.unit || Constants.UNITS[0].value;

    return (
        <Label
            {...props}
            tooltip={props.noTooltip ? '' : `${UnitHelpers.toTemperature(temperature, unit, props.digits)}`}>
            <Grid
                container
                alignItems='center'
                justifyContent='center'>
                {props.prefix}
                <Box marginLeft={props.prefix ? 1 : 0}>{UnitHelpers.toTemperature(temperature, unit, 0)}</Box>
            </Grid>
        </Label>
    );
};

TemperatureRoot.propTypes = {
    children  : PropTypes.number,
    prefix    : PropTypes.node,
    digits    : PropTypes.number,
    unit      : PropTypes.oneOf(Constants.UNITS.map(unit => unit.value)),
    noTooltip : PropTypes.bool,
    ...Label.propTypes,
};

TemperatureRoot.defaultProps = {
    digits    : 1,
    noTooltip : false,
};

export const Temperature = React.memo(TemperatureRoot);

Temperature.propTypes    = TemperatureRoot.propTypes;
Temperature.defaultProps = TemperatureRoot.defaultProps;
