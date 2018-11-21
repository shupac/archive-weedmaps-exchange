// @flow
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import StatusPill from './';

export const orderStatuses = [
  'inProgress',
  'notStarted',
  'returned',
  'canceled',
  'completed',
];

export default storiesOf('StatusPill', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Fragment>
      {orderStatuses.map(status => (
        <div style={{ margin: '10px' }}>
          <StatusPill status={status} />
        </div>
      ))}
    </Fragment>
  ));
