// @flow
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import centered from '@storybook/addon-centered';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

const { colors } = theme;

export const orderStatus = [
  'inProgress',
  'notStarted',
  'returned',
  'canceled',
  'completed',
];

export const statusColor = {
  inProgress: colors.amethyst,
  notStarted: colors.havelockBlue,
  returned: colors.buttercup,
  canceled: colors.red,
  completed: colors.fountainBlue,
};

export const statusName = {
  inProgress: 'in progress',
  notStarted: 'not started',
  returned: 'ready',
  canceled: 'canceled',
  completed: 'completed',
};

export const StatusPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 120px;
  border: 1px solid ${({ status }) => statusColor[status]};
  border-radius: 4px;
  color: ${({ status }) => statusColor[status]};
  line-height: ${rem(12)};
  font-size: ${rem(12)};
  font-weight: 600;
  text-transform: uppercase;
`;

export default storiesOf('StatusPill', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Fragment>
      {orderStatus.map(status => (
        <div style={{ margin: '10px' }}>
          <StatusPill status={status}>{statusName[status]}</StatusPill>
        </div>
      ))}
    </Fragment>
  ));
