import React from 'react';

import { Label, } from '../components/Label';

export default {
    title     : 'Display/Label',
    component : Label,
    argTypes  : {
        align    : {
            options : [
                'inherit',
                'left',
                'center',
                'right',
                'justify',
            ],
            control : {
                type : 'select',
            },
        },
        color    : {
            options : [
                'initial',
                'inherit',
                'primary',
                'secondary',
                'textPrimary',
                'textSecondary',
                'error',
            ],
            control : {
                type : 'select',
            },
        },
        display  : {
            options : [
                'inline',
                'block',
            ],
            control : {
                type : 'select',
            },
        },
        noWrap   : {
            control : {
                type : 'boolean',
            },
        },
        noShadow : {
            control : {
                type : 'boolean',
            },
        },
        variant  : {
            options : [
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'subtitle1',
                'subtitle2',
                'body1',
                'body2',
                'caption',
                'button',
                'overline',
                'srOnly',
                'inherit',
            ],
            control : {
                type : 'select',
            },
        },
    },
};

const Template = args => <Label {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    children : 'Label',
    tooltip  : 'Label',
};

export const NoShadow = Template.bind({});
NoShadow.args = {
    ...Basic.args,
    noShadow : true,
};

export const Primary = Template.bind({});
Primary.args = {
    ...Basic.args,
    color : 'primary',
};
