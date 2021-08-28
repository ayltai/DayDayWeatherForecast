import React from 'react';

import { ConfirmationPreference, } from '../../components/preferences/ConfirmationPreference';

export default {
    title     : 'Preferences/ConfirmationPreference',
    component : ConfirmationPreference,
    argTypes  : {
        onResponse : {
            action : 'responded',
        },
    },
};

const Template = args => <ConfirmationPreference {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    title       : 'ConfirmationPreference',
    description : 'Description',
};
