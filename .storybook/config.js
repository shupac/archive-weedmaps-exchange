import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import theme from 'lib/styles/theme';
import 'lib/styles/global';

// Provides theme globally
const withTheme = (storyFn) => (
  <ThemeProvider theme={theme}>
    { storyFn() }
  </ThemeProvider>
);

addDecorator(withTheme);

// load stories
const stories = require.context('../components', true, /.stories.js$/);

// function to load ech
function loadStories() {
  stories.keys().forEach(story => stories(story));
}

// configure storybook
configure(loadStories, module);
