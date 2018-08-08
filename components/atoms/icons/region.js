import React from 'react';
import { shape, string } from 'prop-types';
import { withTheme } from 'styled-components';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Region = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg viewBox="0 0 15 16" xmlns="http://www.w3.org/1999/xlink" {...size}>
      <g fill="none" fillRule="evenodd" transform="translate(-26 -201)">
        <g transform="translate(-5)" fill={fill} fillRule="nonzero">
          <path d="M38.2 212.23c-2.4-1.871-4.793-3.75-7.2-5.615L38.2 201l7.2 5.615c-2.408 1.864-4.8 3.743-7.2 5.615zm0 2.073l5.887-4.636 1.313 1.018-7.2 5.615-7.2-5.615 1.313-1.018 5.887 4.636z" />
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Region.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Region.defaultProps = {
  className: '',
  size: { width: '15px', height: '16px' },
  fill: themeDefault.colors.teal,
};

export default withTheme(Region);
