// @flow
import React from 'react';
import theme from 'lib/styles/theme';

type Props = {
  fill?: string,
  width?: string,
  height?: string,
};

export const ErrorIcon = ({
  fill = theme.colors.red,
  width = '20',
  height = '18',
}: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
    <defs>
      <path
        id="a"
        d="M2 21h20L12 3 2 21zm10.91-2.842h-1.82v-1.895h1.82v1.895zm0-3.79h-1.82v-3.79h1.82v3.79z"
      />
    </defs>
    <use
      fill={fill}
      fillRule="evenodd"
      transform="translate(-2 -3)"
      xlinkHref="#a"
    />
  </svg>
);

export default ErrorIcon;
