// @flow
import React from 'react';
import WmTheme from '@ghostgroup/ui.theme';

type Props = {
  fill?: string,
  width?: string,
  height?: string,
};
export const BackArrow = ({
  fill = WmTheme.style.icon.dark,
  width = '16px',
  height = '16px',
}: Props) => (
  <svg viewBox="0 0 16 16" width={width} height={height}>
    <path
      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"
      fill={fill}
      fillRule="nonzero"
      transform="translate(-4 -4)"
    />
  </svg>
);
export default BackArrow;
