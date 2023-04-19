import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Component from './TemplateName.component';

const config: ComponentMeta<typeof Component> = {
  title: 'Common/TemplateName',
  component: Component,
};

export default config;

const TemplateNameStory: ComponentStory<typeof Component> = args => <Component {...args} />;

export const TemplateNameComponent = TemplateNameStory.bind({});
TemplateNameComponent.args = {};
