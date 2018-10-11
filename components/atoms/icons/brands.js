import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Brands = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg {...size} viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
      <g
        id="Admin-Placements-Deals"
        fill="none"
        fillRule="evenodd"
        transform="translate(-19 -127)"
      >
        <g id="Group-5">
          <g id="Group-15" transform="translate(0 110)">
            <g id="Icons/Manage" transform="translate(18 13)">
              <g id="Icon/Dashboard">
                <path id="Container" d="M0 0h21v21H0z" />
                <path
                  id="Shape"
                  fill={fill}
                  fillRule="nonzero"
                  d="M7.6974 11.853c.6246 0 1.4275.09 2.2755.2701-1.9629 1.0805-2.2755 2.521-2.2755 3.3313v2.1609H1.05V15.229c0-2.2509 4.4168-3.3767 6.6474-3.3767v.0007zm7.1378.9904c1.7401 0 5.2198.8557 5.2198 2.611v2.1609H9.616v-2.1609c0-1.756 3.4797-2.611 5.2199-2.611h-.0007zM7.6974 9.9623c-1.5617 0-2.8551-1.3059-2.8551-2.8812C4.8423 5.506 6.1363 4.2 7.6974 4.2c1.561 0 2.8551 1.3059 2.8551 2.8811 0 1.5753-1.294 2.8812-2.8551 2.8812zm7.1378.9457c-1.2941 0-2.3648-1.0804-2.3648-2.3863 0-1.3059 1.0707-2.431 2.3648-2.431 1.294 0 2.3647 1.1259 2.3647 2.431 0 1.3052-1.0707 2.3863-2.3647 2.3863z"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Brands.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Brands.defaultProps = {
  className: '',
  size: { width: '20px', height: '14px' },
  fill: themeDefault.colors.teal,
};

export default Brands;
