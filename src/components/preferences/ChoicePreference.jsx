import { Dialog, DialogTitle, } from '@material-ui/core';
import { Check, } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { Choices, } from '../Choices';
import { Preference, } from './Preference';

export const ChoicePreference = props => {
    const [ open, setOpen, ] = React.useState(false);

    const { t, } = useTranslation();

    return (
        <>
            <Preference
                {...props}
                onClick={() => setOpen(true)} />
            <Dialog
                role='dialog'
                open={open}
                onClose={() => setOpen(false)}>
                <DialogTitle>{t(props.title)}</DialogTitle>
                <Choices
                    icon={<Check />}
                    value={props.value}
                    choices={props.choices}
                    onSelect={(choice, index) => {
                        setOpen(false);

                        props.onChange && props.onChange(choice, index);
                    }} />
            </Dialog>
        </>
    );
};

ChoicePreference.propTypes = {
    ...Preference.propTypes,
    value    : PropTypes.shape({
        label : PropTypes.string,
        value : PropTypes.any,
    }),
    choices  : PropTypes.arrayOf(PropTypes.shape({
        label : PropTypes.string,
        value : PropTypes.any,
    })),
    onChange : PropTypes.func,
};
