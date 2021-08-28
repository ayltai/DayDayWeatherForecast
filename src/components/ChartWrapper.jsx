import { Box, useTheme, } from '@material-ui/core';
import { CategoryScale, Chart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, } from 'chart.js';
import PropTypes from 'prop-types';
import React from 'react';

Chart.register(
    CategoryScale,
    Filler,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip,
);

const CHART_NAME = 'chart';

export const ChartWrapper = props => {
    const theme = useTheme();

    Chart.defaults.color                           = theme.palette.text.primary;
    Chart.defaults.font.family                     = theme.typography.fontFamily;
    Chart.defaults.font.size                       = theme.typography.fontSize - 4;
    Chart.defaults.plugins.tooltip.backgroundColor = `rgba(${theme.palette.type === 'dark' ? '97, 97, 97' : '158, 158, 158'}, 0.9)`;

    React.useEffect(() => {
        let chart;

        if (props.data && props.data.datasets) {
            chart = new Chart(CHART_NAME, {
                type    : 'line',
                data    : props.data,
                options : {
                    layout : {
                        padding : {
                            left   : theme.spacing(1.5),
                            right  : theme.spacing(1.5),
                            top    : theme.spacing(1),
                            bottom : theme.spacing(1),
                        },
                    },
                    ...props.options,
                },
            });
        }

        return () => {
            if (chart) chart.destroy();
        };
    }, [ props.size, props.data, props.options, theme, ]);

    return (
        <Box
            width={props.size.width}
            height={props.size.height}>
            <canvas
                role='figure'
                className={props.className}
                id={CHART_NAME}
                width={props.size.width}
                height={props.size.height} />
        </Box>
    );
};

ChartWrapper.propTypes = {
    className : PropTypes.string,
    size      : PropTypes.shape({
        width  : PropTypes.number,
        height : PropTypes.number,
    }).isRequired,
    data      : PropTypes.object,
    options   : PropTypes.object.isRequired,
};
