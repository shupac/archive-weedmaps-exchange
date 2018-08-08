/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import { string } from 'prop-types';
import theme from 'lib/styles/theme';

const Spinner = ({ size, stroke }) => (
  <svg width={size} height={size} viewBox="0 0 32 32">
    <circle
      role="presentation"
      cx={16}
      cy={16}
      r={12}
      stroke={stroke}
      fill="none"
      strokeWidth={2}
      strokeDasharray={Math.PI * 2 * (11 - 2)}
      strokeLinecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.9s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

Spinner.propTypes = {
  size: string,
  stroke: string,
};

Spinner.defaultProps = {
  size: '22px',
  stroke: theme.style.icon.light,
};

export default Spinner;
