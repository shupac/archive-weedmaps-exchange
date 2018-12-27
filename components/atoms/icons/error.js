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
  height = '18px',
  width = '20px',
}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 18"
  >
    <path
      fill={fill}
      fillRule="nonzero"
      d="M19.37 18H.63c-.55 0-.78-.4-.51-.88L9.52.36c.27-.48.7-.48.97 0l9.4 16.76c.27.49.04.87-.52.87zM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM9 7v3a1 1 0 0 0 2 0V7a1 1 0 0 0-2 0z"
    />
  </svg>
);

export default ErrorIcon;
