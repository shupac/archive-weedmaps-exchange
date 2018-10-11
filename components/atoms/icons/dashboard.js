import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Dashboard = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg
      viewBox="0 0 15 15"
      transform="translate(1)"
      xmlns="http://www.w3.org/2000/svg"
      {...size}
    >
      <g fill="none" fillRule="evenodd" transform="translate(-27 -82)">
        <g transform="translate(-5)" fill={fill} fillRule="nonzero">
          <path d="M39.987 82H46.4v4.8h-6.413V82zm0 14.4v-7.987H46.4V96.4h-6.413zM32 96.4v-4.8h6.413v4.8H32zm0-6.413V82h6.413v7.987H32z" />
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Dashboard.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Dashboard.defaultProps = {
  className: '',
  size: { width: '14px', height: '16px' },
  fill: themeDefault.colors.teal,
};

export default Dashboard;
