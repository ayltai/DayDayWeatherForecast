import React from 'react';

import { Timestamp, } from '../components/Timestamp';

export default {
    title     : 'Display/Timestamp',
    component : Timestamp,
    argTypes  : {
        timestamp : {
            control : {
                type : 'number',
            },
        },
    },
};

const Template = args => <Timestamp {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    prefix    : 'Last updated: ',
    timestamp : Date.now(),
};
