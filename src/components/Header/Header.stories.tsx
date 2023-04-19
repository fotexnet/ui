import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Component, { HeaderProps } from './Header.component';

const config: Meta<HeaderProps> = {
  title: 'Layout/Header',
  component: Component,
};

export default config;

const HeaderStory: StoryFn<HeaderProps> = args => <Component {...args} />;

export const HeaderComponent = HeaderStory.bind({});
HeaderComponent.args = {
  Logo: <img src="" alt="Logo" />,
  backgroundColor: '#9ac1ac',
  children: [
    <input type="text" placeholder="Keresés..." />,
    <SettingsIcon width="100%" height="100%" />,
    <NotificationsIcon width="100%" height="100%" />,
    <div>Profile</div>,
  ],
};
