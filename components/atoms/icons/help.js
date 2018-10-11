import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Help = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg
      viewBox="0 0 16 16"
      transform="translate(1)"
      xmlns="http://www.w3.org/2000/svg"
      {...size}
    >
      <g fill="none" fillRule="evenodd" transform="translate(-24 -1139)">
        <g transform="translate(-5)" fill={fill} fillRule="nonzero">
          <path d="M37.404 1144.351v-1.544h-1.508v1.544h1.508zm0 6.142v-4.597h-1.508v4.597h1.508zM36.65 1139a7.633 7.633 0 0 1 7.65 7.65 7.633 7.633 0 0 1-7.65 7.65 7.634 7.634 0 0 1-7.65-7.65 7.634 7.634 0 0 1 7.65-7.65z" />
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Help.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Help.defaultProps = {
  className: '',
  size: { width: '16px', height: '16px' },
  fill: themeDefault.colors.teal,
};

export default Help;
