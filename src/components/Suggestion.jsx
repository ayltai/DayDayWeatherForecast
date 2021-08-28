import { TextField, } from '@material-ui/core';
import { Autocomplete, } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { useDebounce, } from '../hooks/useDebounce';
import { Constants } from '../Constants';

export const Suggestion = props => {
    const [ value, setValue, ] = React.useState('');

    const debouncedValue = useDebounce(value, Constants.USER_INPUT_DEBOUNCE);

    const { t, } = useTranslation();

    React.useEffect(() => {
        props.onChange && props.onChange(debouncedValue);
    }, [ debouncedValue, ]);

    return (
        <Autocomplete
            freeSolo
            autoComplete
            clearOnEscape
            disableListWrap
            includeInputInList
            options={props.suggestions || []}
            renderInput={params => (
                <TextField
                    {...params}
                    margin='dense'
                    placeholder={t(props.hint)}
                    onChange={event => setValue(event.target.value)} />
            )}
            onChange={(event, newValue, reason) => props.onSelect && reason === 'select-option' && newValue && props.onSelect(newValue)} />
    );
};

Suggestion.propTypes = {
    hint        : PropTypes.string,
    suggestions : PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange    : PropTypes.func,
    onSelect    : PropTypes.func,
};
