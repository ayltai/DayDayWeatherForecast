import { Box, Grid, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Constants } from '../Constants';

import { UnitHelpers, } from '../utils/UnitHelpers';
import { Label, } from './Label';

export const Temperature = props => {
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

Temperature.propTypes = {
    children  : PropTypes.number,
    prefix    : PropTypes.node,
    digits    : PropTypes.number,
    unit      : PropTypes.oneOf(Constants.UNITS.map(unit => unit.value)),
    noTooltip : PropTypes.bool,
    ...Label.propTypes,
};

Temperature.defaultProps = {
    digits    : 1,
    noTooltip : false,
};
