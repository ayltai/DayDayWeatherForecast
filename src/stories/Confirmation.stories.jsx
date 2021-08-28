import React from 'react';

import { Confirmation, } from '../components/Confirmation';

export default {
    title     : 'Feedback/Confirmation',
    component : Confirmation,
    argTypes  : {
        show       : {
            control : {
                type : 'boolean',
            },
        },
        onClose    : {
            action : 'closed',
        },
        onResponse : {
            action : 'responded'
        },
    },
};

const Template = args => (
    <Confirmation
        show
        {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
    title   : 'Confirmation',
    message : 'Message',
};
