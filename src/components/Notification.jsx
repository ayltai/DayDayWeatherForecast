import { Snackbar, } from '@material-ui/core';
import { Alert, } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { Constants } from '../Constants';

export const Notification = props => {
    const [ open, setOpen, ] = React.useState(props.show);

    const { t, } = useTranslation();

    const handleClose = () => {
        props.onClose && props.onClose();

        setOpen(false);
    };

    return (
        <Snackbar
            role='alertdialog'
            open={open}
            autoHideDuration={props.autoClose ? Constants.NOTIFICATION_AUTO_HIDE : null}
            onClose={handleClose}>
            <Alert
                role='alert'
                severity={props.type}
                onClose={props.autoClose || props.onClose ? handleClose : undefined}>
                {t(props.message)}
            </Alert>
        </Snackbar>
    );
};

Notification.propTypes = {
    show      : PropTypes.bool,
    type      : PropTypes.oneOf([
        'info',
        'error',
        'warning',
        'success'
    ]),
    message   : PropTypes.string,
    autoClose : PropTypes.bool,
    onClose   : PropTypes.func,
};

Notification.defaultProps = {
    message   : '',
    type      : 'success',
};
