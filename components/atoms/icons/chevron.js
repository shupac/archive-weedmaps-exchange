import React from 'react';
import { string, shape } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

const getRotation = direction => {
  switch (direction) {
    case 'right':
      return '0 0 0';
    case 'left':
      return `180 6 6`;
    case 'down':
      return `90 6 6`;
    default:
      return 0;
  }
};

export const Chevron = ({ size, fill, direction, thickness }) => (
  <IconWrapper size={size}>
    <svg {...size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
      <path
        d="M3.25 0.5 L8.75 6 L3.25 11.5"
        stroke={fill}
        fill="none"
        strokeWidth={thickness}
        fillRule="evenodd"
        transform={`rotate(${getRotation(direction, size)})`}
      />
    </svg>
  </IconWrapper>
);

Chevron.propTypes = {
  size: shape({ width: string, height: string }),
  fill: string,
  direction: string,
};

export const ChevronRight = ({ size, fill, direction, thickness }) => (
  <Chevron
    size={size}
    fill={fill}
    direction={direction}
    thickness={thickness}
  />
);

ChevronRight.propTypes = Chevron.propTypes;

ChevronRight.defaultProps = {
  size: { width: '12px', height: '12px' },
  fill: themeDefault.colors.aluminum,
  direction: 'right',
  thickness: 2,
};

export const ChevronLeft = ({ size, fill, direction, thickness }) => (
  <Chevron
    size={size}
    fill={fill}
    direction={direction}
    thickness={thickness}
  />
);

ChevronLeft.propTypes = Chevron.propTypes;

ChevronLeft.defaultProps = {
  size: { width: '12px', height: '12px' },
  fill: themeDefault.colors.aluminum,
  direction: 'left',
  thickness: 2,
};

export const ChevronDown = ({ size, fill, direction, thickness }) => (
  <Chevron
    size={size}
    fill={fill}
    direction={direction}
    thickness={thickness}
  />
);

ChevronDown.propTypes = Chevron.propTypes;

ChevronDown.defaultProps = {
  size: { width: '12px', height: '12px' },
  fill: themeDefault.colors.aluminum,
  direction: 'down',
  thickness: 2,
};

export default ChevronRight;
