import React from 'react';
import { HashRouter, } from 'react-router-dom';

import { TitleBar, } from '../components/TitleBar';

export default {
    title     : 'Surfaces/TitleBar',
    component : TitleBar,
};

const Template = args => (
    <HashRouter>
        <TitleBar {...args} />
    </HashRouter>
);

export const Basic = Template.bind({});
Basic.args = {
    title : 'TitleBar',
};
