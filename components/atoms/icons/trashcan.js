import React from 'react';
import { WmTheme } from '@ghostgroup/ui';
import { shape, string } from 'prop-types';
import IconWrapper from './icon-wrapper.styled';

export const Trashcan = ({ size, fill }: Props) => (
  <IconWrapper size={size}>
    <svg
      {...size}
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 17.5 20"
    >
      <path
        fill={fill}
        d="M14.1 18.3a.59.59 0 0 1-.58.53H4a.59.59 0 0 1-.58-.53L2.39 7h12.72zM1.17 5.27a1.75 1.75 0 0 1 1.75-1.75h11.66a1.75 1.75 0 0 1 1.75 1.75v.59H1.17zm4.66-3.51a.59.59 0 0 1 .59-.59h4.66a.59.59 0 0 1 .59.59v.58H5.83zm-.1 15.9a.6.6 0 0 1-.59-.56l-.37-8.28a.59.59 0 1 1 1.17-.06L6.31 17a.59.59 0 0 1-.56.62zm3 0a.59.59 0 0 1-.58-.59V8.79a.58.58 0 1 1 1.16 0v8.28a.59.59 0 0 1-.56.59zm3 0a.59.59 0 0 1-.56-.62l.37-8.28a.59.59 0 1 1 1.17.06l-.37 8.28a.6.6 0 0 1-.59.56zm2.85-15.32h-1.75v-.58A1.75 1.75 0 0 0 11.08 0H6.42a1.75 1.75 0 0 0-1.75 1.76v.58H2.92A2.93 2.93 0 0 0 0 5.27v1.18A.58.58 0 0 0 .58 7h.64l1 11.37A1.74 1.74 0 0 0 4 20h9.54a1.74 1.74 0 0 0 1.74-1.6l1-11.4h.64a.58.58 0 0 0 .58-.58V5.27a2.93 2.93 0 0 0-2.92-2.93z"
      />
    </svg>
  </IconWrapper>
);

Trashcan.propTypes = {
  size: shape({ width: string, height: string }),
  fill: string,
};

Trashcan.defaultProps = {
  size: { width: '16px', height: '16px' },
  fill: WmTheme.style.border.default,
};

export default Trashcan;
