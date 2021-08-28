import React from 'react';

import { FontIcon, } from '../components/FontIcon';

export default {
    title     : 'Display/FontIcon',
    component : FontIcon,
    argTypes  : {
        size : {
            options : [
                'small',
                'medium',
            ],
            control : {
                type : 'select',
            },
        },
    },
};

const Template = args => <FontIcon {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    className : 'fas fa-cog',
};

export const Medium = Template.bind({});
Medium.args = {
    ...Basic.args,
    size : 'medium',
};
