import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { useInterval, } from '../hooks/useInterval';
import { StringHelpers, } from '../utils/StringHelpers';
import { Constants, } from '../Constants';
import { Label, } from './Label';

export const Timestamp = props => {
    const [ timeAgo, setTimeAgo, ] = React.useState(moment().fromNow());

    useInterval(() => setTimeAgo(moment(props.timestamp).fromNow()), Constants.UPDATE_INTERVAL);

    return (
        <Label
            tooltip={moment(new Date(props.timestamp)).format('LLLL')}
            align={props.align}
            variant='caption'
            noWrap>
            {(props.prefix) + StringHelpers.capitalize(timeAgo)}
        </Label>
    );
};

Timestamp.propTypes = {
    align     : PropTypes.oneOf([
        'center',
        'left',
        'right'
    ]),
    prefix    : PropTypes.string,
    timestamp : PropTypes.number,
};

Timestamp.defaultProps = {
    align     : 'center',
    prefix    : '',
    timestamp : Date.now(),
};
