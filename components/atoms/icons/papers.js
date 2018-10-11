import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Papers = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg xmlns="http://www.w3.org/2000/svg" {...size} viewBox="0 0 18 19">
      <g
        id="Admin-Placements-Deals"
        fill="none"
        fillRule="evenodd"
        transform="translate(-19 -269)"
      >
        <g id="Group-5">
          <g id="Group-15" transform="translate(0 254)">
            <g id="Icons/Inventory" transform="translate(17 14)">
              <g id="Icon/Inventory" transform="translate(-1.05 1.05)">
                <path id="Container" d="M0 0h21v21H0z" />
                <path
                  id="Shape"
                  fill={fill}
                  fillRule="nonzero"
                  d="M11.7596 13.429C8.889 11.1916 6.0285 8.9443 3.15 6.7144L11.7596 0l8.6097 6.7145c-2.8785 2.2292-5.739 4.4765-8.6097 6.7144zm0 2.4787l7.0406-5.543 1.5698 1.217-8.6096 6.7145-8.6097-6.7144 1.5698-1.217 7.0391 5.5429z"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Papers.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Papers.defaultProps = {
  className: '',
  size: { width: '14px', height: '16px' },
  fill: themeDefault.colors.teal,
};

export default Papers;
