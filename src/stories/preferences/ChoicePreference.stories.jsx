import React from 'react';

import { ChoicePreference, } from '../../components/preferences/ChoicePreference';

export default {
    title     : 'Preferences/ChoicePreference',
    component : ChoicePreference,
    argTypes  : {
        onChange : {
            action : 'changed',
        },
    },
};

const Template = args => <ChoicePreference {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    title       : 'ChoicePreference',
    description : 'Description',
    choices     : [
        {
            label : 'Ten',
            value : 10,
        },
        {
            label : 'Twenty',
            value : 20,
        },
        {
            label : 'Thirty',
            value : 30,
        },
    ],
    value : {
        label : 'Ten',
        value : 10,
    },
};
