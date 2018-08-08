import React from 'react';
import { shape, string } from 'prop-types';
import { withTheme } from 'styled-components';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Desktop = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg
      {...size}
      viewBox="0 0 21 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="08-Moderation-ListingOwner-EditNewDeal-Custom-Preview"
          transform="translate(-1057.000000, -346.000000)"
          fill={fill}
        >
          <g id="Deal-Detail" transform="translate(328.000000, 288.000000)">
            <g id="popup-mobile">
              <path
                d="M731.247238,70.9579727 L747.752762,70.9579727 L747.752762,60.1812817 L731.247238,60.1812817 L731.247238,70.9579727 Z M736.728904,73.1392544 L736.728904,75.8190674 L735.83911,75.8190674 C735.218665,75.8190674 734.716301,76.3077346 734.716301,76.9102321 C734.716301,77.5127295 735.218665,78 735.83911,78 L743.16089,78 C743.781605,78 744.285048,77.5127295 744.285048,76.9102321 C744.285048,76.3077346 743.781605,75.8190674 743.16089,75.8190674 L742.271365,75.8190674 L742.271365,73.1392544 L747.907626,73.1392544 C749.061642,73.1392544 750,72.2284375 750,71.1082915 L750,60.0309629 C750,58.9108169 749.061642,58 747.907626,58 L731.092374,58 C729.938358,58 729,58.9108169 729,60.0309629 L729,71.1082915 C729,72.2284375 729.938358,73.1392544 731.092374,73.1392544 L736.728904,73.1392544 Z"
                id="Page-1"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Desktop.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Desktop.defaultProps = {
  className: '',
  size: { width: '21px', height: '20px' },
  fill: themeDefault.colors.teal,
};

export default withTheme(Desktop);
