// @flow
import React from 'react';
import { WmTheme } from '@ghostgroup/ui';

const { icon } = WmTheme.style;

type Props = {
  fill?: string,
  size?: string,
  direction: string,
};

export const DIRECTION = {
  up: '180deg',
  down: '0deg',
  right: '270deg',
  left: '90deg',
};

export const Caret = ({
  size = '9px',
  fill = icon.light,
  direction = DIRECTION.down,
}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 9 4"
    style={{
      transform: `rotate(${direction})`,
      transition: `transform .2s ease`,
    }}
  >
    <path fill={fill} fillRule="evenodd" d="M4.498486 4L9 0H0z" />
  </svg>
);

export default Caret;
