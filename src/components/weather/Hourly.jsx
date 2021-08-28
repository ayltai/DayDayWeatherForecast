import { useTheme, } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { DateTimeHelpers, } from '../../utils/DateTimeHelpers';
import { NumberFormatHelpers, } from '../../utils/NumberFormatHelpers';
import { UnitHelpers, } from '../../utils/UnitHelpers';
import { WeatherHelpers, } from '../../utils/WeatherHelpers';
import { Constants, } from '../../Constants';
import { ChartWrapper, } from '../ChartWrapper';

export const Hourly = props => {
    const theme      = useTheme();
    const isDarkMode = theme.palette.type === 'dark';

    const { t, } = useTranslation();

    const [ chartData, setChartData, ] = React.useState({});
    const [ scales,    setScales,    ] = React.useState({});
    const [ tooltips,  setTooltips,  ] = React.useState({});
    const [ minScale,  setMinScale,  ] = React.useState(0);
    const [ maxScale,  setMaxScale,  ] = React.useState(0);

    const commonStyle = {
        label           : '',
        clip            : theme.spacing(1),
        pointRadius     : 0,
        pointHitRadius  : theme.spacing(2),
        backgroundColor : isDarkMode ? theme.palette.primary.dark : theme.palette.primary.light,
        borderColor     : isDarkMode ? theme.palette.info.dark : theme.palette.info.light,
        tension         : 0.5,
    };

    const commonScale = {
        position : 'right',
        grid     : {
            borderColor     : theme.palette.text.primary,
            drawOnChartArea : false,
            color           : theme.palette.text.primary,
        },
    };

    const createData = React.useCallback(() => ({
        labels   : [],
        datasets : [
            {
                label           : '',
                yAxisID         : 'temp',
                order           : 0,
                data            : [],
                clip            : theme.spacing(1.5),
                pointStyle      : [],
                pointHitRadius  : theme.spacing(2),
                backgroundColor : isDarkMode ? theme.palette.primary.dark : theme.palette.primary.light,
                borderColor     : isDarkMode ? theme.palette.secondary.dark : theme.palette.secondary.light,
                tension         : 0.5,
            },
            {
                label           : '',
                yAxisID         : 'precip',
                order           : 1,
                data            : [],
                clip            : theme.spacing(1.5),
                pointRadius     : 0,
                pointHitRadius  : theme.spacing(2),
                fill            : 'origin',
                backgroundColor : isDarkMode ? theme.palette.primary.dark : theme.palette.primary.light,
                borderColor     : isDarkMode ? theme.palette.primary.dark : theme.palette.primary.light,
                tension         : 0.5,
            },
            {
                label : '',
                order : 2,
                data  : [],
            },
            {
                yAxisID : Constants.FORECAST_TYPES[0].value,
                hidden  : props.forecast !== Constants.FORECAST_TYPES[0].value,
                order   : props.forecast === Constants.FORECAST_TYPES[0].value ? 3 : 0,
                data    : [],
                ...commonStyle,
            },
            {
                yAxisID : Constants.FORECAST_TYPES[1].value,
                hidden  : props.forecast !== Constants.FORECAST_TYPES[1].value,
                order   : props.forecast === Constants.FORECAST_TYPES[1].value ? 3 : 0,
                data    : [],
                ...commonStyle,
            },
            {
                yAxisID : Constants.FORECAST_TYPES[2].value,
                hidden  : props.forecast !== Constants.FORECAST_TYPES[2].value,
                order   : props.forecast === Constants.FORECAST_TYPES[2].value ? 3 : 0,

                data    : [],
                ...commonStyle,
            },
        ],
    }), [ props.title, props.forecast, theme, ]);

    const updateData = React.useCallback(data => {
        for (let i = 0; i < Constants.FORECAST_TYPES.length; i++) data.datasets[i + 3].hidden = props.forecast !== Constants.FORECAST_TYPES[i].value;

        for (const propsData of props.data) {
            data.labels.push(moment(new Date(propsData.time)).format(props.timeFormat));
            data.datasets[0].data.push(UnitHelpers.toTemperature(propsData.temperature, props.unit, 1, false));
            data.datasets[1].data.push(NumberFormatHelpers.toFixed(propsData.precipProbability * 100, 0));
            data.datasets[2].data.push(propsData.precipIntensity);
            data.datasets[3].data.push(NumberFormatHelpers.toFixed(propsData.humidity * 100, 0));
            data.datasets[4].data.push(UnitHelpers.toWindSpeed(propsData.windSpeed, props.unit, 1, false));
            if (propsData.uvIndex || propsData.uvIndex === 0) data.datasets[5].data.push(propsData.uvIndex);

            const icon = new Image(theme.spacing(3), theme.spacing(3));
            icon.src = `img/${isDarkMode ? 'dark' : 'light'}/${WeatherHelpers.getIcon(props.providerId, DateTimeHelpers.isDay(), propsData.icon) || 'wi-na'}.svg`;

            data.datasets[0].pointStyle.push(icon);
        }

        return data;
    }, [ props.providerId, props.unit, props.forecast, props.data, theme, ]);

    const createScales = React.useCallback(() => {
        if (chartData && chartData.datasets) {
            const newScales = {
                x      : {
                    grid : {
                        borderColor     : theme.palette.text.primary,
                        drawOnChartArea : false,
                        color           : theme.palette.text.primary,
                    },
                },
                temp   : {
                    position : 'left',
                    grid     : {
                        borderColor     : theme.palette.text.primary,
                        drawOnChartArea : false,
                        color           : theme.palette.text.primary,
                    },
                    min      : minScale,
                    max      : maxScale,
                    ticks    : {
                        stepSize : maxScale - minScale,
                        callback : value => UnitHelpers.toTemperature(value, props.unit, 0),
                    },
                },
                precip : {
                    display  : false,
                    position : 'left',
                    min      : 0,
                    max      : 100,
                    ticks    : {
                        stepSize : 50,
                    },
                },
            };

            newScales[Constants.FORECAST_TYPES[0].value] = {
                display : props.forecast === Constants.FORECAST_TYPES[0].value,
                min     : 0,
                max     : 100,
                ticks   : {
                    stepSize : 50,
                    callback : label => `${label}%`,
                },
                ...commonScale,
            };

            newScales[Constants.FORECAST_TYPES[1].value] = {
                display      : props.forecast === Constants.FORECAST_TYPES[1].value,
                min          : 0,
                suggestedMax : Math.max(props.unit === Constants.UNITS[0].value ? 200 : 120, Math.ceil(Math.max.apply(Math, chartData.datasets[4].data))),
                ticks        : {
                    stepSize : Math.max(props.unit === Constants.UNITS[0].value ? 50 : 30, Math.ceil(Math.max.apply(Math, chartData.datasets[4])) / 4),
                    callback : value => `${UnitHelpers.toWindSpeed(value, props.unit, 0)}`,
                },
                ...commonScale,
            };

            newScales[Constants.FORECAST_TYPES[2].value] = {
                display      : props.forecast === Constants.FORECAST_TYPES[2].value,
                suggestedMin : 0,
                suggestedMax : 12,
                ticks        : {
                    stepSize : 2,
                },
                ...commonScale,
            };

            return newScales;
        }

        return {};
    }, [ props.unit, props.forecast, theme, chartData, minScale, maxScale, ]);

    const createTooltips = React.useCallback(() => ({
        displayColors : false,
        callbacks     : {
            label : context => [
                `${props.temperaturePrefix || ''}${UnitHelpers.toTemperature(context.chart.data.datasets[0].data[context.dataIndex], props.unit)}`,
                `${props.precipPrefix || ''}${NumberFormatHelpers.toFixed(context.chart.data.datasets[1].data[context.dataIndex])}% ${NumberFormatHelpers.toFixed(context.chart.data.datasets[2].data[context.dataIndex])}mm`,
                context.chart.data.datasets[3].data[context.dataIndex] || context.chart.data.datasets[3].data[context.dataIndex] === 0 ? `${props.humidityPrefix || ''}${NumberFormatHelpers.toFixed(context.chart.data.datasets[3].data[context.dataIndex], 0)}%` : '',
                `${props.windSpeedPrefix || ''}${UnitHelpers.toWindSpeed(context.chart.data.datasets[4].data[context.dataIndex], props.unit, 0)}`,
                context.chart.data.datasets[5].data[context.dataIndex] || context.chart.data.datasets[5].data[context.dataIndex] === 0 ? `${props.uvIndexPrefix || ''}${NumberFormatHelpers.toFixed(context.chart.data.datasets[5].data[context.dataIndex], 0)}` : '',
            ],
        },
    }), [ props.unit, props.temperaturePrefix, props.humidityPrefix, props.precipPrefix, props.humidityPrefix, props.windSpeedPrefix, props.uvIndexPrefix, ]);

    React.useEffect(() => {
        setChartData(updateData(createData()));
    }, [ createData, updateData, ]);

    React.useEffect(() => {
        if (chartData && chartData.datasets) {
            setMinScale(Math.ceil(Math.min.apply(Math, chartData.datasets[0].data)) - 1);
            setMaxScale(Math.floor(Math.max.apply(Math, chartData.datasets[0].data)) + 1);
        }
    }, [ chartData, ]);

    React.useEffect(() => {
        setScales(createScales());
        setTooltips(createTooltips());
    }, [ chartData, minScale, maxScale, ]);

    return (
        <ChartWrapper
            className={props.className}
            size={props.size}
            data={chartData}
            options={{
                plugins  : {
                    legend  : {
                        display : false,
                    },
                    title   : {
                        display : true,
                        padding : 0,
                        font    : {
                            weight : 'normal',
                        },
                        text    : t(props.title),
                    },
                    tooltip : tooltips,
                },
                scales,
            }} />
    );
};

Hourly.propTypes = {
    className         : PropTypes.string,
    size              : PropTypes.shape({
        width  : PropTypes.number,
        height : PropTypes.number,
    }).isRequired,
    data              : PropTypes.arrayOf(PropTypes.object),
    providerId        : PropTypes.oneOf(Constants.WEATHER_PROVIDERS.map(provider => provider.id)),
    unit              : PropTypes.oneOf(Constants.UNITS.map(unit => unit.value)),
    title             : PropTypes.string,
    temperaturePrefix : PropTypes.string,
    humidityPrefix    : PropTypes.string,
    precipPrefix      : PropTypes.string,
    windSpeedPrefix   : PropTypes.string,
    uvIndexPrefix     : PropTypes.string,
    forecast          : PropTypes.oneOf(Constants.FORECAST_TYPES.map(forecast => forecast.value)),
    timeFormat        : PropTypes.oneOf([
        'HH',
        'ha',
    ]),
};

Hourly.defaultProps = {
    title      : 'Hourly forecast',
    timeFormat : 'ha',
};
