import { Divider, ListSubheader, } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

const PreferenceTitleRoot = props => {
    const { t, } = useTranslation();

    return (
        <>
            {props.divider && <Divider />}
            <ListSubheader
                role='heading'
                color='inherit'
                disableSticky>
                {t(props.title)}
            </ListSubheader>
        </>
    );
};

PreferenceTitleRoot.propTypes = {
    title   : PropTypes.string.isRequired,
    divider : PropTypes.bool,
};

export const PreferenceTitle = React.memo(PreferenceTitleRoot);

PreferenceTitle.propTypes = PreferenceTitleRoot.propTypes;
