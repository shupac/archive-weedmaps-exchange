// @flow
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import WmTheme from '@ghostgroup/ui.theme';

const { icon } = WmTheme.style;

type Props = {
  size?: number,
  fill?: string,
  stroke?: string,
};

export const MapPin = ({
  size = 75,
  fill = icon.dark,
  stroke = 'none',
}: Props) => (
  <svg
    viewBox="0 0 12 14"
    className="wm-icon-map-pin"
    width={size}
    height={size}
    fill={fill}
    stroke={stroke}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="global" fill="none" fillRule="evenodd">
      <g id="location-selector" transform="translate(-974 -163)">
        <g transform="translate(974 163)">
          <mask id="mask-2" fill="white">
            <path d="M.6667 5.3333c0 1.0417.3555 2 .9333 2.8334l4.4 5.5 4.4-5.5c.5778-.7917.9333-1.7917.9333-2.8334 0-2.75-2.4-5-5.3333-5-2.9333 0-5.3333 2.25-5.3333 5zm2.6666.3334C3.3333 4.2 4.5333 3 6 3c1.4667 0 2.6667 1.2 2.6667 2.6667 0 1.4666-1.2 2.6666-2.6667 2.6666-1.4667 0-2.6667-1.2-2.6667-2.6666z" />
          </mask>

          <path
            fill={fill}
            d="M.6667 5.3333c0 1.0417.3555 2 .9333 2.8334l4.4 5.5 4.4-5.5c.5778-.7917.9333-1.7917.9333-2.8334 0-2.75-2.4-5-5.3333-5-2.9333 0-5.3333 2.25-5.3333 5zm2.6666.3334C3.3333 4.2 4.5333 3 6 3c1.4667 0 2.6667 1.2 2.6667 2.6667 0 1.4666-1.2 2.6666-2.6667 2.6666-1.4667 0-2.6667-1.2-2.6667-2.6666z"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default MapPin;
