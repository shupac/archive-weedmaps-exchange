import React from 'react';
import { shape, string } from 'prop-types';
import { withTheme } from 'styled-components';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Tag = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg" {...size}>
      <g fill="none" fillRule="evenodd" transform="translate(-26 -162)">
        <g transform="translate(-5)" fill={fill}>
          <path d="M45 170.28c0-.32-.114-.6-.342-.841l-6.607-6.598c-.234-.234-.548-.433-.943-.596-.394-.163-.754-.245-1.08-.245h-3.845c-.32 0-.598.117-.832.351a1.137 1.137 0 0 0-.351.832v3.844c0 .327.082.687.245 1.081.163.395.362.706.596.934l6.607 6.616c.228.228.505.342.832.342.32 0 .6-.114.84-.342l4.538-4.546c.228-.228.342-.506.342-.832zm-10.206-4.487a1.14 1.14 0 0 1-.837.347 1.14 1.14 0 0 1-.836-.347 1.14 1.14 0 0 1-.347-.836c0-.326.116-.605.347-.836a1.14 1.14 0 0 1 .836-.347c.327 0 .605.116.837.347.23.23.346.51.346.836 0 .327-.116.605-.346.836z" />
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Tag.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Tag.defaultProps = {
  className: '',
  size: { width: '14px', height: '16px' },
  fill: themeDefault.colors.teal,
};

export default withTheme(Tag);
