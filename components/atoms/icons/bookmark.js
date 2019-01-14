// @flow
import React from 'react';
import theme from 'lib/styles/theme';

type Props = {
  width?: string,
  fill?: string,
};

export const Bookmark = ({
  width = '24',
  fill = theme.colors.gullGray,
}: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 100 125">
    <path
      d="M80 10H20c-3.3333 0-3.3333 0-3.3333 3.3333v81c0 1.6667 1 1.9334 2.2666 1.2L50 77.6667l30.8667 17.6666c1.1333.6667 2.4666.6667 2.4666-1v-81C83.3333 10 83.3333 10 80 10zm0 0"
      fill={fill}
    />
  </svg>
);

export default Bookmark;
