import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Mail = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" {...size}>
      <g fill="none" fillRule="evenodd" transform="translate(-1171 -22)">
        <g transform="translate(197)" fill={fill}>
          <path d="M992 22h-16c-1.1 0-1.99.9-1.99 2L974 36c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V24c0-1.1-.9-2-2-2zm0 4l-8 5-8-5v-2l8 5 8-5v2z" />
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Mail.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Mail.defaultProps = {
  className: '',
  size: { width: '24px', height: '16px' },
  fill: themeDefault.colors.aluminum,
};

export default Mail;
