import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';

import TextArea from '.';

export default storiesOf('TextArea', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <TextArea placeholder="Enter text" />)
  .add('With fixed height', () => (
    <TextArea placeholder="Enter text" minHeight={60} maxHeight={60} />
  ))
  .add('With min and max rows', () => (
    <TextArea placeholder="Enter text" rows={2} maxRows={5} />
  ))
  .add('With error', () => (
    <TextArea errorMessage="There is an error with your entry" />
  ))
  .add('Disabled', () => <TextArea disabled />);
