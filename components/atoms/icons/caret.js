// @flow
import React from 'react';
import { WmTheme } from '@ghostgroup/ui';

const { icon } = WmTheme.style;

type Props = {
  fill?: string,
  size?: string,
  pointsUp?: boolean,
};

export const Caret = ({ size, fill, pointsUp }: Props) => {
  const direction = pointsUp ? `180deg` : `0deg`;
  return (
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
};

Caret.defaultProps = {
  fill: icon.light,
  size: '9px',
  pointsUp: false,
};

export default Caret;
