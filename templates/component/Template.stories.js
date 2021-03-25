import React from 'react';
import Template from './Template';

export default {
  title: 'Components/Components/Template',
  component: Template
};

const _Template = (args) => <Template {...args}>Texto</Template>;

export const Primary = _Template.bind({});
