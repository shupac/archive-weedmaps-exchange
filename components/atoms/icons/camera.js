import React from 'react';
import PropTypes from 'prop-types';
import theme from 'lib/styles/theme';

export const Camera = ({ fill, height, width }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 29 27"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.75,5 L3.75,1.25 L6.25,1.25 L6.25,5 L10,5 L10,7.5 L6.25,7.5 L6.25,11.25 L3.75,11.25 L3.75,7.5 L0,7.5 L0,5 L3.75,5 Z M7.5,12.5 L7.5,8.75 L11.25,8.75 L11.25,5 L20,5 L22.2875,7.5 L26.25,7.5 C27.625,7.5 28.75,8.625 28.75,10 L28.75,25 C28.75,26.375 27.625,27.5 26.25,27.5 L6.25,27.5 C4.875,27.5 3.75,26.375 3.75,25 L3.75,12.5 L7.5,12.5 Z M16.25,23.75 C19.7,23.75 22.5,20.95 22.5,17.5 C22.5,14.05 19.7,11.25 16.25,11.25 C12.8,11.25 10,14.05 10,17.5 C10,20.95 12.8,23.75 16.25,23.75 Z M12.25,17.5 C12.25,19.7125 14.0375,21.5 16.25,21.5 C18.4625,21.5 20.25,19.7125 20.25,17.5 C20.25,15.2875 18.4625,13.5 16.25,13.5 C14.0375,13.5 12.25,15.2875 12.25,17.5 Z"
      fill={fill}
    />
  </svg>
);

Camera.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

Camera.defaultProps = {
  height: '17px',
  width: '18px',
  fill: theme.colors.white,
};

export default Camera;
