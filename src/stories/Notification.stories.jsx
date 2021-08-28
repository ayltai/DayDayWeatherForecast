import React from 'react';

import { Notification, } from '../components/Notification';

export default {
    title     : 'Feedback/Notification',
    component : Notification,
    argTypes  : {
        show      : {
            control : {
                type : 'boolean',
            },
        },
        type      : {
            options : [
                'info',
                'error',
                'warning',
                'success',
            ],
            control : {
                type : 'select',
            },
        },
        autoClose : {
            control : {
                type : 'boolean',
            },
        },
        closeable : {
            control : {
                type : 'boolean',
            },
        },
        onClose   : {
            action : 'closed',
        },
    },
};

const Template = args => <Notification {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    show    : true,
    message : 'Notification',
    onClose : false,
};

export const AutoClose = Template.bind({});
AutoClose.args = {
    ...Basic.args,
    onClose   : undefined,
    autoClose : true,
};

export const Closeable = Template.bind({});
Closeable.args = {
    ...Basic.args,
    onClose   : undefined,
    closeable : true,
};
