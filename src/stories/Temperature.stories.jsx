import { Whatshot, } from '@material-ui/icons';
import React from 'react';

import { Temperature, } from '../components/Temperature';
import { Constants, } from '../Constants';
import Label from './Label.stories';

export default {
    title     : 'Display/Temperature',
    component : Temperature,
    argTypes  : {
        children : {
            control : {
                type : 'number',
            },
        },
        digits   : {
            control : {
                type : 'number',
            },
        },
        unit     : {
            options : Constants.UNITS.map(unit => unit.value),
            control : {
                type : 'select',
            },
        },
        ...Label.argTypes,
    },
};

const Template = args => <Temperature {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    children : 32.1,
    unit     : Constants.UNITS[0].value,
};

export const WithPrefix = Template.bind({});
WithPrefix.args = {
    ...Basic.args,
    prefix : <Whatshot fontSize='small' />,
};
