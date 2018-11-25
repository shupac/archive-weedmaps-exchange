// @flow
import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

const { colors } = theme;

const statusColor = {
  in_progress: colors.amethyst,
  not_started: colors.havelockBlue,
  returned: colors.buttercup,
  canceled: colors.red,
  completed: colors.fountainBlue,
};

const statusName = {
  in_progress: 'in progress',
  not_started: 'not started',
  returned: 'ready',
  canceled: 'canceled',
  completed: 'completed',
};

const Pill = styled.div`
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

type Props = {
  status: string,
};

const StatusPill = ({ status }: Props) => (
  <Pill status={status}>{statusName[status]}</Pill>
);

export default StatusPill;
