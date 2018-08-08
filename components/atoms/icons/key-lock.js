import React from 'react';
import { shape, string } from 'prop-types';
import { withTheme } from 'styled-components';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Keylock = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg
      viewBox="0 0 16 17"
      transform="translate(-1)"
      xmlns="http://www.w3.org/1999/xlink"
      {...size}
    >
      <g fill="none" fillRule="evenodd" transform="translate(-26 -239)">
        <g transform="translate(-5)" fill={fill}>
          <g transform="translate(31 239)">
            <path d="M10.497 13.676H6.752v.114H5.748v-3.771h1.004v.152h3.745c.235-.397.55-.744.932-1.024.347-.255.732-.44 1.14-.551v-1.49H0V17h12.569v-1.748a3.463 3.463 0 0 1-1.14-.551 3.454 3.454 0 0 1-.932-1.025" />
            <path d="M4.053 4.4c0-1.127.999-2.041 2.231-2.041.617 0 1.174.228 1.578.598.404.37.654.88.654 1.443v1.71h2.29V4.314C10.805 1.93 8.78 0 6.283 0a4.618 4.618 0 0 0-3.197 1.264 4.205 4.205 0 0 0-1.324 3.05V6.11h2.29V4.4z" />
            <path d="M14.26 12.396a.511.511 0 0 1-.514-.508c0-.282.23-.51.514-.51.283 0 .513.228.513.51 0 .28-.23.508-.513.508m-.764-2.928a2.429 2.429 0 0 0-.082.001l-.039.002h-.003a62.3 62.3 0 0 1-.094.007l-.037.003-.057.007c-.037.004-.073.01-.109.016l-.058.01a1.576 1.576 0 0 0-.053.011l-.067.015a2.501 2.501 0 0 0-.328.106 2.47 2.47 0 0 0-1.429 1.521H6.75v1.513h4.391a2.471 2.471 0 0 0 1.806 1.639 1.371 1.371 0 0 0 .13.026l.108.015.057.007a1.206 1.206 0 0 0 .081.007l.05.003h.003l.04.001a.848.848 0 0 0 .081.002c1.368 0 2.476-1.1 2.476-2.456a2.466 2.466 0 0 0-2.476-2.456" />
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Keylock.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Keylock.defaultProps = {
  className: '',
  size: { width: '14px', height: '16px' },
  fill: themeDefault.colors.teal,
};

export default withTheme(Keylock);
