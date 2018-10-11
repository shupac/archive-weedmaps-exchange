import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Listings = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg {...size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd" transform="translate(-20 -80)">
        <g fill={fill} fillRule="nonzero">
          <g transform="translate(20 78)">
            <g transform="translate(0 2)">
              <path d="M14.58 7.2c-.45 0-.89-.14-1.25-.39-.03-.02-.07-.02-.12 0a2.21 2.21 0 0 1-2.51 0c-.03-.02-.07-.02-.12 0a2.21 2.21 0 0 1-2.51 0c-.02-.02-.07-.02-.12 0a2.21 2.21 0 0 1-2.51 0c-.02-.02-.07-.02-.11 0a2.21 2.21 0 0 1-2.52 0c-.02-.02-.07-.02-.11 0a2.21 2.21 0 0 1-1.67.34c-.07-.02-.12.03-.12.1v8.66c-.02.04 0 .09.07.09h1.56a.1.1 0 0 0 .09-.1v-5.77c0-.05.04-.1.09-.1h3.7c.05 0 .1.05.1.1v5.78c0 .04.04.09.09.09H15a.1.1 0 0 0 .1-.1V7.26c0-.07-.05-.12-.12-.1-.13.03-.27.05-.4.05zm-1.3 6.1H9.17a.1.1 0 0 1-.1-.09v-2.79c0-.04.05-.09.1-.09h4.11c.05 0 .1.05.1.1v2.78a.1.1 0 0 1-.1.1zm2.58-9.16c.1.18.14.39 0 .6 0 .77-.64 1.39-1.41 1.39-.53 0-.99-.28-1.24-.71-.02-.05-.11-.05-.14 0a1.43 1.43 0 0 1-2.46 0c-.03-.05-.12-.05-.14 0a1.43 1.43 0 0 1-2.47 0c-.02-.05-.11-.05-.14 0a1.43 1.43 0 0 1-2.47 0c-.02-.05-.11-.05-.13 0a1.43 1.43 0 0 1-2.47 0c-.02-.05-.12-.05-.14 0-.23.4-.7.7-1.23.7a1.4 1.4 0 0 1-1.3-1.96v-.02a.93.93 0 0 1 .1-.2l1.06-1.75.02-.04V.09c0-.04.05-.09.1-.09H14.76c.04 0 .09.05.09.1V2.3l.93 1.74c.03.02.03.04.05.06l.02.03z" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Listings.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Listings.defaultProps = {
  className: '',
  size: { width: '16px', height: '16px' },
  fill: themeDefault.colors.teal,
};

export default Listings;
