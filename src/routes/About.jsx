import { Grid, makeStyles, Typography, } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation, } from 'react-i18next';

import { withTitle, } from '../components/withTitle';

const useStyles = makeStyles(theme => ({
    image : {
        margin : theme.spacing(4),
    }
}));

const AboutRoot = props => {
    const classes = useStyles();

    const { t, } = useTranslation();

    return (
        <Grid
            container
            alignItems='center'
            alignContent='center'
            direction='column'>
            <img
                role='img'
                className={classes.image}
                src={props.logo}
                width={128}
                height={128}
                alt={t(props.appName)} />
            <Typography
                variant='h5'
                align='center'>
                {t(props.appName)}
            </Typography>
            <Typography
                variant='body1'
                align='center'>
                {`${t('Version')} ${props.version}`}
            </Typography>
            <Typography
                display='block'
                variant='caption'
                align='center'>
                {`${t('Copyright')} © ${moment().format('YYYY')}`}
            </Typography>
        </Grid>
    );
};

export const About = React.memo(withTitle(AboutRoot));

About.propTypes = {
    title   : PropTypes.string,
    appName : PropTypes.string,
    version : PropTypes.string,
    logo    : PropTypes.string,
};

AboutRoot.propTypes = {
    ...About.propTypes,
};
