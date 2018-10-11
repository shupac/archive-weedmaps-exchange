import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Mobile = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg
      {...size}
      viewBox="0 0 12 20"
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
          id="07-Moderation-ListingOwner-EditNewDeal-Custom-Preview"
          transform="translate(-1094.000000, -346.000000)"
          fill={fill}
        >
          <g id="Deal-Detail" transform="translate(328.000000, 288.000000)">
            <g id="popup-desktop">
              <path
                d="M771.088955,76.0800365 C771.088955,75.5668085 771.495838,75.1446777 771.999081,75.1446777 C772.504162,75.1446777 772.911198,75.5668085 772.911198,76.0800365 C772.911198,76.5968832 772.504162,77.0166539 771.999081,77.0166539 C771.495838,77.0166539 771.088955,76.5968832 771.088955,76.0800365 Z M776.087525,59.8713469 L776.087525,74.3628783 L767.90359,74.3628783 L767.822244,59.9666921 L776.087525,59.8713469 Z M776.179595,58 L767.822244,58 C766.815605,58 766,58.8401709 766,59.8713469 L766,76.1280238 C766,77.1617172 766.815605,78 767.822244,78 L776.179595,78 C777.184395,78 778,77.1617172 778,76.1280238 L778,59.8713469 C778,58.8401709 777.184395,58 776.179595,58 Z"
                id="Fill-1"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Mobile.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Mobile.defaultProps = {
  className: '',
  size: { width: '12px', height: '20px' },
  fill: themeDefault.colors.teal,
};

export default Mobile;
