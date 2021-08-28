import React from 'react';

import { BooleanPreference, } from '../../components/preferences/BooleanPreference';

export default {
    title     : 'Preferences/BooleanPreference',
    component : BooleanPreference,
    argTypes  : {
        checked  : {
            control : {
                type : 'boolean',
            },
        },
        onClick  : {
            action : 'clicked',
        },
        onChange : {
            action : 'changed',
        },
    },
};

const Template = args => <BooleanPreference {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    title       : 'BooleanPreference',
    description : 'Description',
};
