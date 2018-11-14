import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text } from '@storybook/addon-knobs/react';

import Loader from './';

export default storiesOf('Loader', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Loader
      size={`${number('spinner size', 48)}px`}
      loaderText={text('loading text', '')}
    />
  ));
