import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { TitleBar, } from './TitleBar';

export const withTitle = WrappedComponent => {
    const WithTitle = props => {
        const { action, title, ...rest } = props;

        const { t, } = useTranslation();

        return (
            <>
                <TitleBar
                    title={t(title)}
                    action={action} />
                <WrappedComponent {...rest} />
            </>
        );
    };

    WithTitle.propTypes = {
        title  : PropTypes.string,
        action : PropTypes.node,
    };

    return WithTitle;
};
