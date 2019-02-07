// @flow
import React from 'react';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

type Props = {
  fill?: string,
  size?: {
    width: string,
    height: string,
  },
};

export const Cart = ({
  size = { width: '18px', height: '18px' },
  fill = themeDefault.style.icon.light,
}: Props) => (
  <IconWrapper size={size}>
    <svg {...size} viewBox="0 0 20 14" xmlns="http://www.w3.org/1999/xlink">
      <g transform="translate(-1 -1)" fill="none" fillRule="evenodd">
        <path
          fill={fill}
          d="M15.016 15.008c.898 0 1.639.782 1.639 1.682 0 .9-.742 1.643-1.64 1.643-.896 0-1.677-.743-1.677-1.643s.78-1.682 1.678-1.682zM1.666 1.667H4.4l.78 1.643h12.335c.468 0 .82.39.82.86 0 .157-.04.275-.117.392l-2.967 5.4c-.273.508-.82.86-1.444.86H7.6l-.742 1.37-.039.117c0 .117.079.195.195.195h9.642v1.683H6.663c-.898 0-1.639-.783-1.639-1.683 0-.274.079-.547.195-.782l1.133-2.073L3.346 3.31H1.668V1.668l-.001-.001zm4.997 13.341c.898 0 1.679.782 1.679 1.682 0 .9-.78 1.643-1.679 1.643a1.65 1.65 0 0 1-1.639-1.643c0-.9.741-1.682 1.64-1.682z"
        />
      </g>
    </svg>
  </IconWrapper>
);

export default Cart;
