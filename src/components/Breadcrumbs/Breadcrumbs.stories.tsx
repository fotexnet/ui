import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Component, { ClickableLabel, IBreadcrumbsProps } from './Breadcrumbs.component';

const config: Meta<IBreadcrumbsProps> = {
  title: 'Layout/Breadcrumbs',
  component: Component,
};

export default config;

const BreadcrumbsStory: StoryFn<IBreadcrumbsProps> = args => <Component {...args} />;

export const BreadcrumbsComponent = BreadcrumbsStory.bind({});
BreadcrumbsComponent.args = {
  url: '/users/new',
  map: new Map<string, string>([
    ['users', 'Felhasználók'],
    ['settings', 'Beállítások'],
  ]),
};

export const NotClickableBreadcrumbsComponent = BreadcrumbsStory.bind({});
NotClickableBreadcrumbsComponent.args = {
  url: '/users/new',
  map: new Map<string, string | ClickableLabel>([
    ['users', { label: 'Felhasználók', clickable: false }],
    ['new', 'Új felhasználó'],
  ]),
};
