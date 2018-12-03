// @flow
import React from 'react';
import { WmTheme } from '@ghostgroup/ui';

const { icon } = WmTheme.style;

type Props = {
  fill?: string,
  size?: number | string,
  direction: string,
};

export const POSITION = {
  horizontal: '0deg',
  vertical: '90deg',
};

export const Dots = ({
  fill = icon.light,
  size,
  direction = POSITION.vertical,
}: Props) => (
  <svg
    className="wm-icon wm-dots"
    viewBox="0 0 210 210"
    width={size || '18px'}
    height={size || '18px'}
    style={{
      transform: `rotate(${direction})`,
    }}
  >
    <path
      fill={fill}
      d="M25 80a25 25 0 1 0 0 50 25 25 0 0 0 0-50zM105 80a25 25 0 1 0 0 50 25 25 0 0 0 0-50zM185 80a25 25 0 1 0 0 50 25 25 0 0 0 0-50z"
    />
  </svg>
);

export default Dots;
