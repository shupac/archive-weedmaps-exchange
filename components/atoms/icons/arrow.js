import React from 'react';
import { string, shape } from 'prop-types';
import { withTheme } from 'styled-components';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

const getRotation = direction => {
  switch (direction) {
    case 'down':
      return '-90 5 3';
    case 'up':
      return '90 5 3';
    case 'left':
      return '0 0 0';
    case 'right':
      return '180 5 3';
    default:
      return 0;
  }
};

const Arrow = ({ className, size, fill, direction }) => (
  <IconWrapper className={className} size={size}>
    <svg viewBox="0 0 10 6" {...size}>
      <defs>
        <path id="a" d="M2 2.998L5 8h2.875L4.856 2.998 8-2H5z" />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(-1421 -27)">
        <g transform="translate(197)">
          <g transform="translate(1103 10)">
            <g transform="translate(121 17)">
              <path
                fill={fill}
                transform={`rotate(${getRotation(direction)})`}
                d="M2 2.998L5 8h2.875L4.856 2.998 8-2H5z"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Arrow.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
  direction: string,
};

Arrow.defaultProps = {
  className: '',
  direction: 'down',
  size: { width: '14px', height: '16px' },
  fill: themeDefault.colors.aluminum,
};

export const ArrowDown = ({ className, size, fill }) => (
  <Arrow className={className} size={size} fill={fill} direction="down" />
);
ArrowDown.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};
ArrowDown.defaultProps = {
  className: '',
  size: { width: '14px', height: '16px' },
  fill: themeDefault.colors.aluminum,
};

export const ArrowUp = ({ className, size, fill }) => (
  <Arrow className={className} size={size} fill={fill} direction="up" />
);
ArrowUp.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};
ArrowUp.defaultProps = {
  className: '',
  size: { width: '14px', height: '16px' },
  fill: themeDefault.colors.aluminum,
};

export const ArrowLeft = ({ className, size, fill }) => (
  <Arrow className={className} size={size} fill={fill} direction="left" />
);
ArrowLeft.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};
ArrowLeft.defaultProps = {
  className: '',
  size: { width: '14px', height: '16px' },
  fill: themeDefault.colors.aluminum,
};

export const ArrowRight = ({ className, size, fill }) => (
  <Arrow className={className} size={size} fill={fill} direction="right" />
);
ArrowRight.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};
ArrowRight.defaultProps = {
  className: '',
  size: { width: '14px', height: '16px' },
  fill: themeDefault.colors.aluminum,
};

export default withTheme(ArrowDown);
