// @flow
import React from 'react';

type Props = {
  height?: string,
  width?: string,
  fill?: string,
};

export const Plus = ({ height, width, fill }: Props) => (
  <svg width={width} height={height} viewBox="0 0 18 18">
    <g fill={fill}>
      <polygon points="0 7 0 11 18 10.92 18 7" />
      <rect x="7" y="0" width="4" height="18" />
    </g>
  </svg>
);

Plus.defaultProps = {
  height: '16px',
  width: '16px',
  fill: '#DEDDDA',
};

export default Plus;
