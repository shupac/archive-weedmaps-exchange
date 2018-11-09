// @flow
import React from 'react';

export const IncreaseQuantity = ({
  width = '16px',
  height = '16px',
}: {
  width?: string,
  height?: string,
}) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      fill="#9FA9BA"
      fillRule="nonzero"
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm4 8.667H8.667V12H7.333V8.667H4V7.333h3.333V4h1.334v3.333H12v1.334z"
    />
  </svg>
);

export default IncreaseQuantity;
