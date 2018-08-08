import React from 'react';
import { string, shape } from 'prop-types';
import { withTheme } from 'styled-components';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

const getRotation = direction => {
  switch (direction) {
    case 'right':
      return '0 0 0';
    case 'left':
      return '180 4 6';
    default:
      return 0;
  }
};

const Chevron = ({ size, fill, direction }) => (
  <IconWrapper size={size}>
    <svg {...size} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 1.4L1.4189189 0 7.5 6l-6.0810811 6L0 10.6 4.6621622 6z"
        fill={fill}
        fillRule="evenodd"
        transform={`rotate(${getRotation(direction)})`}
      />
    </svg>
  </IconWrapper>
);

Chevron.propTypes = {
  size: shape({ width: string, height: string }),
  fill: string,
  direction: string,
};

export const ChevronRight = ({ size, fill, direction }) => (
  <Chevron size={size} fill={fill} direction={direction} />
);

ChevronRight.propTypes = Chevron.propTypes;

ChevronRight.defaultProps = {
  size: { width: '8px', height: '12px' },
  fill: themeDefault.colors.aluminum,
  direction: 'right',
};

export const ChevronLeft = ({ size, fill, direction }) => (
  <Chevron size={size} fill={fill} direction={direction} />
);

ChevronLeft.propTypes = Chevron.propTypes;

ChevronLeft.defaultProps = {
  size: { width: '8px', height: '12px' },
  fill: themeDefault.colors.aluminum,
  direction: 'left',
};

export default withTheme(ChevronRight);
