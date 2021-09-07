import { Icon, } from '@material-ui/core';
import { loadCSS, } from 'fg-loadcss';
import PropTypes from 'prop-types';
import React from 'react';

const nodeId = '#font-awesome-css';

const FontIconRoot = props => {
    React.useEffect(() => {
        if (!document.querySelector(nodeId)) {
            const node = loadCSS('https://use.fontawesome.com/releases/v5.15.3/css/all.css', document.querySelector(nodeId));

            return () => node.parentNode.removeChild(node);
        }
    }, []);

    return (
        <Icon
            role='img'
            className={props.className}
            fontSize={props.size} />
    );
};

FontIconRoot.propTypes = {
    className : PropTypes.string.isRequired,
    size      : PropTypes.oneOf([
        'medium',
        'small',
    ]),
};

FontIconRoot.defaultProps = {
    size : 'small',
};

export const FontIcon = React.memo(FontIconRoot);

FontIcon.propTypes    = FontIconRoot.propTypes;
FontIcon.defaultProps = FontIconRoot.defaultProps;
