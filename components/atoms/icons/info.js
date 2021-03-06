// @flow
import React from 'react';
import themeDefault from 'lib/styles/theme';

type Props = {
  size?: {
    width: string,
    height: string,
  },
  fill: string,
};

export const Info = ({
  size = { width: '18px', height: '18px' },
  fill = themeDefault.style.icon.light,
}: Props) => (
  <svg {...size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={fill}
      d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25c-.69 0-1.249-.56-1.249-1.25s.559-1.25 1.249-1.25zM14 18h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735V18z"
    />
  </svg>
);

export default Info;
