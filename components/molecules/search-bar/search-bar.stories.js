import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';
import backgroundColor from 'react-storybook-decorator-background';
import SearchBar from './';

export default storiesOf('Compound Search', module)
  .addDecorator(GlobalStyleDecorator)
  .addDecorator(backgroundColor(['#F2F5F5', '#FFFFFF', '#000000']))
  .add('Default', () => <SearchBar dispatch={() => {}} />);
