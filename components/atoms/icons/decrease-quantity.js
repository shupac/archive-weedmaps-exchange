import React from 'react';

export const DecreaseQuantity = ({
  width = '16px',
  height = '16px',
}: {
  width: string,
  height: string,
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
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm4 8.667H4V7.333h8v1.334z"
    />
  </svg>
);

export default DecreaseQuantity;
