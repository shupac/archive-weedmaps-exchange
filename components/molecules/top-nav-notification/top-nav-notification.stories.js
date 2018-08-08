import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import GlobalStyleDecorator from 'storybook/decorators/global-style';
import backgroundColor from 'react-storybook-decorator-background';
import Notification from './index';

export default storiesOf('Top nav: Notification')
  .addDecorator(GlobalStyleDecorator)
  .addDecorator(backgroundColor(['#F2F5F5', '#FFFFFF', '#000000']))
  .addDecorator(withKnobs)
  .add('Notification', () => <Notification />);
