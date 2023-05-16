import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Component, { SearchProps } from './Search.component';

const config: Meta<SearchProps> = {
  title: 'Common/Search',
  component: Component,
};

export default config;

const SearchStory: StoryFn<SearchProps> = args => <Component {...args} />;

export const SearchComponent = SearchStory.bind({});
SearchComponent.args = {
  results: [],
  onChange: value => console.log(value),
};

// axios.get('/api/items?query=VALUE').then(() => SET_RESULTS_IN_LIST)
