// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import StatusPill from './';

export const orderStatuses = [
  'in_progress',
  'not_started',
  // 'returned',
  'canceled',
  'completed',
  'shipped',
];

export default storiesOf('StatusPill', module)
  .addDecorator(centered)
  .add('Default', () => (
    <>
      {orderStatuses.map(status => (
        <div style={{ margin: '10px' }}>
          <StatusPill status={status} />
        </div>
      ))}
    </>
  ));
