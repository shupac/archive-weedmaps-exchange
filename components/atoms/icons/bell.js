import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Bell = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" {...size}>
      <g fill="none" fillRule="evenodd" transform="translate(-1236 -20)">
        <g transform="translate(197)" fill={fill}>
          <path d="M1047 40c.14 0 .27-.01.4-.041a2.042 2.042 0 0 0 1.44-1.21c.1-.246.15-.513.15-.8h-4c.01 1.128.9 2.051 2.01 2.051zm6-11.282c0-3.149-1.64-5.785-4.5-6.482v-.698c0-.85-.67-1.538-1.5-1.538s-1.5.687-1.5 1.538v.698c-2.87.697-4.5 3.323-4.5 6.482v5.128l-2 2.051v1.026h16v-1.026l-2-2.05v-5.13z" />
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Bell.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Bell.defaultProps = {
  className: '',
  size: { width: '16px', height: '20px' },
  fill: themeDefault.colors.aluminum,
};

export default Bell;
