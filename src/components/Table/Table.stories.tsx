import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Component, { TableProps } from './Table.component';

const config: Meta<TableProps> = {
  title: 'Common/Table',
  component: Component,
};

export default config;

const TableStory: StoryFn<TableProps> = args => <Component {...args} />;

export const TableComponent = TableStory.bind({});
TableComponent.args = {};
