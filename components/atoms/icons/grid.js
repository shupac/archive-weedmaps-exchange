// @flow
import React from 'react';
import { WmTheme } from '@ghostgroup/ui';

const { icon } = WmTheme.style;

type Props = {
  fill?: string,
  size?: string,
};

const Grid = ({ size, fill }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
  >
    <defs>
      <path
        id="a"
        d="M13 2h9v7h-9V2zm0 20V11h9v11h-9zM2 22v-7h9v7H2zm0-9V2h9v11H2z"
      />
    </defs>
    <use
      fill={fill}
      fillRule="nonzero"
      transform="translate(-2 -2)"
      xlinkHref="#a"
    />
  </svg>
);

Grid.defaultProps = {
  fill: icon.light,
  size: '18px',
};

export default Grid;
