import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import createLayout from '../utils/createLayout/createLayout';

const withLayout = createLayout([<div>Header</div>, <div>Footer</div>], 1, {
  content: [<div>Content 1</div>, <div>Content 2</div>],
  position: 2,
});
const Component = withLayout(() => {
  return <div>Main</div>;
});

const config: Meta = {
  title: 'Test/withLayout',
  component: Component,
};

export default config;

const WithLayoutStory: StoryFn = () => <Component />;

export const WithLayoutComponent = WithLayoutStory.bind({});
WithLayoutComponent.args = {};
