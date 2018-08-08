/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import PropTypes from 'prop-types';

export const Close = ({ fill, size }) => (
  <svg fill={fill} width={size} height={size} viewBox="0 0 14 14">
    <g
      fill={fill}
      stroke="none"
      transform="translate(-821.000000, -525.000000)"
    >
      <g transform="translate(515.000000, 509.000000)">
        <polygon points="320 17.41 318.59 16 313 21.59 307.41 16 306 17.41 311.59 23 306 28.59 307.41 30 313 24.41 318.59 30 320 28.59 314.41 23" />
      </g>
    </g>
  </svg>
);

Close.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.string,
};

Close.defaultProps = {
  fill: '#ffffff',
  size: '20px',
};

export default Close;
