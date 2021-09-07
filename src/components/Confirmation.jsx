import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

const ConfirmationRoot = props => {
    const { t, } = useTranslation();

    const handleClick = response => {
        props.onResponse && props.onResponse(response);
        props.onClose && props.onClose();
    };

    return (
        <Dialog
            role='dialog'
            open={props.show}
            onClose={() => props.onClose && props.onClose()}>
            <DialogTitle>{t(props.title)}</DialogTitle>
            <DialogContent>
                <DialogContentText color='inherit'>{t(props.message)}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    role='button'
                    autoFocus
                    color='primary'
                    onClick={() => handleClick(false)}>
                    {t(props.negativeAction)}
                </Button>
                <Button
                    role='button'
                    color='primary'
                    onClick={() => handleClick(true)}>
                    {t(props.positiveAction)}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmationRoot.propTypes = {
    title          : PropTypes.string.isRequired,
    message        : PropTypes.string.isRequired,
    positiveAction : PropTypes.string,
    negativeAction : PropTypes.string,
    show           : PropTypes.bool,
    onClose        : PropTypes.func,
    onResponse     : PropTypes.func,
};

ConfirmationRoot.defaultProps = {
    positiveAction : 'Yes',
    negativeAction : 'No',
};

export const Confirmation = React.memo(ConfirmationRoot);

Confirmation.propTypes    = ConfirmationRoot.propTypes;
Confirmation.defaultProps = ConfirmationRoot.defaultProps;
