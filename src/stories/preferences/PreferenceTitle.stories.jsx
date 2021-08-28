import React from 'react';

import { PreferenceTitle, } from '../../components/preferences/PreferenceTitle';

export default {
    title     : 'Preferences/PreferenceTitle',
    component : PreferenceTitle,
    argTypes  : {
        divider : {
            control : {
                type : 'boolean',
            },
        },
    },
};

const Template = args => <PreferenceTitle {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    title : 'PreferenceTitle',
};

export const WithDivider = Template.bind({});
WithDivider.args = {
    ...Basic.args,
    divider : true,
};
