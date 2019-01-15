// @flow
import React from 'react';
import { STATUS_TYPES } from 'lib/common/constants';
import { Pill } from './styles';

type Props = {
  status: string,
};

const StatusPill = ({ status }: Props) => (
  <Pill status={status}>{STATUS_TYPES[status].text}</Pill>
);

export default StatusPill;
