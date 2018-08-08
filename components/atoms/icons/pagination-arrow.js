import React from 'react';
import { string, shape } from 'prop-types';
import { withTheme } from 'styled-components';
import themeDefault from 'lib/styles/theme';

const getRotation = direction => {
  switch (direction) {
    case 'left':
      return '0 0 0';
    case 'right':
      return '180 4 7';
    default:
      return 0;
  }
};

const PaginationArrow = ({ direction, fill, size }) => (
  <svg {...size}>
    <path
      fill={fill}
      transform={`rotate(${getRotation(direction)})`}
      d="M7.533 6.538L8 7l-.467.462L.933 14 0 13.075l6.6-6.537v.924L0 .925.933 0z"
    />
  </svg>
);

PaginationArrow.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
  direction: string,
};

PaginationArrow.defaultProps = {
  className: '',
  direction: 'down',
  size: { width: '8px', height: '14px' },
  fill: themeDefault.colors.aluminum,
};

export const PaginationArrowLeft = ({ size, fill }) => (
  <PaginationArrow size={size} fill={fill} direction="left" />
);
PaginationArrowLeft.propTypes = {
  size: shape({ width: string, height: string }),
  fill: string,
};

export const PaginationArrowRight = ({ size, fill }) => (
  <PaginationArrow size={size} fill={fill} direction="right" />
);
PaginationArrowRight.propTypes = {
  size: shape({ width: string, height: string }),
  fill: string,
};

export default withTheme(PaginationArrow);
