import React from 'react';
import { storiesOf } from '@storybook/react';
import storybookBackgrounds from 'lib/common/storybook-backgrounds';
import BackgroundColorDecorator from '../../../.storybook/decorators/background-color';
import GlobalStyleDecorator from '../../../.storybook/decorators/global-style';
import Avatar from './index.js';

export default storiesOf('Avatar')
  .addDecorator(storybookBackgrounds())
  .addDecorator(GlobalStyleDecorator)
  .addDecorator(BackgroundColorDecorator)
  .add('No Avatar URL', () => <Avatar avatarUrl="" />)
  .add('Avatar URL provided', () => (
    <Avatar avatarUrl="http://i.pravatar.cc/120" />
  ));
