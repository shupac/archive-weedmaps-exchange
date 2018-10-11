import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Menu = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg
      width="24px"
      height="16px"
      viewBox="0 0 24 16"
      xmlns="http://www.w3.org/2000/svg"
      {...size}
    >
      <defs>
        <path
          d="M4,24 L28,24 L28,21.33 L4,21.33 L4,24 Z M4,17.33 L28,17.33 L28,14.66 L4,14.666 L4,17.33 Z M4,8 L4,10.66 L28,10.66 L28,8 L4,8 Z"
          id="path-menu1"
        />
      </defs>
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform="translate(-217.0, -22.0)"
      >
        <g transform="translate(197.0, 0.0)">
          <g transform="translate(16.0, 14.0)">
            <mask id="mask-2" fill="white">
              <use xlink="#path-menu1" />
            </mask>
            <use
              className="menu-icon-fill"
              fill={fill}
              fillRule="nonzero"
              xlinkHref="#path-menu1"
            />
            <g mask="url(#mask-2)" fill="#9C9C9C" fillRule="evenodd">
              <rect id="Rectangle-3" x="0" y="0" width="32" height="32" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Menu.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Menu.defaultProps = {
  className: '',
  size: { width: '24px', height: '16px' },
  fill: themeDefault.colors.aluminum,
};

export default Menu;
