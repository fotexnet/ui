import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Component, { IBreadcrumbsProps } from './Breadcrumbs.component';

const config: Meta<IBreadcrumbsProps> = {
  title: 'Layout/Breadcrumbs',
  component: Component,
};

export default config;

const BreadcrumbsStory: StoryFn<IBreadcrumbsProps> = args => <Component {...args} />;

export const BreadcrumbsComponent = BreadcrumbsStory.bind({});
BreadcrumbsComponent.args = {
  url: '/users/b1d1945d-e905-4804-9153-fddd03f846a1/settings',
  labelMap: new Map<string, string>([
    ['users', 'Felhasználók'],
    ['settings', 'Beállítások'],
  ]),
};
