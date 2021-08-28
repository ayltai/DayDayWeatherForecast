import { Settings, } from '@material-ui/icons';
import React from 'react';

import { Action, } from '../components/Action';

export default {
    title     : 'Inputs/Action',
    component : Action,
    argTypes  : {
        edge    : {
            options : [
                'end',
                'start',
            ],
            control : {
                type : 'select',
            },
        },
        onClick : {
            action : 'clicked',
        },
    },
};

const Template = args => <Action {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    tooltip : 'Action',
    icon : <Settings fontSize='small' />,
};
