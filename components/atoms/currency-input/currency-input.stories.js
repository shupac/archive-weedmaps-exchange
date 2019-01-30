import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';

import CurrencyInput from '.';

export default storiesOf('CurrencyInput', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <CurrencyInput defaultValue="0.00" />);
