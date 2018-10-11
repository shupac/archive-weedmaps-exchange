import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Chart = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg {...size} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-19, -221)">
        <g>
          <g transform="translate(0, 206)">
            <g transform="translate(17, 13)">
              <g>
                <rect x="0" y="0" width="21" height="21" />
                <path
                  d="M15.508 15.5074V11.651h-1.9285v3.8564h1.9286zm-3.8563 0V5.9112H9.7683v9.5962h1.8834zm-3.812 0V8.781H5.9113v6.7263h1.9286zM17.3915 2.1c1.0318 0 1.9286.8968 1.9286 1.9286v13.3628c0 1.0318-.8968 1.9286-1.9286 1.9286H4.0286c-1.0318 0-1.9286-.8968-1.9286-1.9286V4.0286C2.1 2.9968 2.9968 2.1 4.0286 2.1h13.3628z"
                  fill={fill}
                />
              </g>
            </g>
          </g>
        </g>
      </g>{' '}
    </svg>
  </IconWrapper>
);

Chart.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Chart.defaultProps = {
  className: '',
  size: { width: '18px', height: '18px' },
  fill: themeDefault.colors.teal,
};

export default Chart;
