// @flow
import React from 'react';
import theme from 'lib/styles/theme';

type Props = {
  width?: string,
  height?: string,
  fill?: string,
};

export const Bookmark = ({
  width = '16',
  height = '20',
  fill = theme.colors.gullGray,
}: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
    <defs>
      <path id="a" d="M20 22l-8-4.39L4 22V2h16z" />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(-4 -2)">
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <use fill="#000" fillRule="nonzero" xlinkHref="#a" />
      <g fill={fill} mask="url(#b)">
        <path d="M0 0h24v24H0z" />
      </g>
    </g>
  </svg>
);

export default Bookmark;
