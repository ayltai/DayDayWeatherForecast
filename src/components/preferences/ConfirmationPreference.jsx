import PropTypes from 'prop-types';
import React from 'react';

import { Confirmation, } from '../Confirmation';
import { Preference, } from './Preference';

export const ConfirmationPreference = props => {
    const [ open, setOpen, ] = React.useState(false);

    return (
        <>
            <Preference
                {...props}
                onClick={() => setOpen(true)} />
            <Confirmation
                {...props}
                show={open}
                onClose={() => setOpen(false)} />
        </>
    );
};

ConfirmationPreference.propTypes = {
    ...Preference.propTypes,
    message        : PropTypes.string.isRequired,
    positiveAction : PropTypes.string,
    negativeAction : PropTypes.string,
    onResponse     : PropTypes.func,
};
