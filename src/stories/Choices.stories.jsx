import { Check, Delete, } from '@material-ui/icons';
import React from 'react';

import { Choices, } from '../components/Choices';

export default {
    title     : 'Inputs/Choices',
    component : Choices,
    argTypes  : {
        onSelect : {
            action : 'selected',
        },
        onAction : {
            action : 'actioned',
        },
    },
};

const Template = args => <Choices {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    choices : [
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
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    ...Basic.args,
    value : {
        label : 'Ten',
        value : 10,
    },
    icon  : <Check />,
};

export const WithAction = Template.bind({});
WithAction.args = {
    ...Basic.args,
    action : <Delete />,
};
