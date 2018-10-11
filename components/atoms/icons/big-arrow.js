import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const BigArrow = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg xmlns="http://www.w3.org/2000/svg" {...size}>
      <path
        fill={fill}
        d="M16 7H3.83l5.59-5.59L8 0 0 8l8 8 1.41-1.41L3.83 9H16z"
        fillRule="evenodd"
      />
    </svg>
  </IconWrapper>
);

BigArrow.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

BigArrow.defaultProps = {
  className: '',
  size: { width: '16px', height: '16px' },
  fill: themeDefault.colors.aluminum,
};

export default BigArrow;
