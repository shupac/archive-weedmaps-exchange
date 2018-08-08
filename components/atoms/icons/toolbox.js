import React from 'react';
import { shape, string } from 'prop-types';
import { withTheme } from 'styled-components';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Toolbox = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg viewBox="0 0 17 16" xmlns="http://www.w3.org/1999/xlink" {...size}>
      <defs>
        <path
          d="M6.8 11.05v-.85H.8585L.85 13.6c0 .9435.7565 1.7 1.7 1.7h11.9c.9435 0 1.7-.7565 1.7-1.7v-3.4H10.2v.85H6.8zm8.5-7.65h-3.4085V1.7l-1.7-1.7h-3.4l-1.7 1.7v1.7H1.7C.765 3.4 0 4.165 0 5.1v2.55c0 .9435.7565 1.7 1.7 1.7h5.1v-1.7h3.4v1.7h5.1c.935 0 1.7-.765 1.7-1.7V5.1c0-.935-.765-1.7-1.7-1.7zm-5.1 0H6.8V1.7h3.4v1.7z"
          id="path-toolbox1"
        />
      </defs>
      <g>
        <use id="Icon" fill={fill} xlinkHref="#path-toolbox1" />
      </g>
    </svg>
  </IconWrapper>
);

Toolbox.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Toolbox.defaultProps = {
  className: '',
  size: { width: '17px', height: '16px' },
  fill: themeDefault.colors.teal,
};

export default withTheme(Toolbox);
