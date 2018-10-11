import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Flag = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg" {...size}>
      <g fill="none" fillRule="evenodd" transform="translate(-26 -121)">
        <g transform="translate(-5)" fill={fill}>
          <path d="M44.845 123.046a.505.505 0 0 0-.368-.154c-.071 0-.22.057-.445.171-.227.114-.466.241-.72.384a5.21 5.21 0 0 1-.9.382 3.093 3.093 0 0 1-.96.173c-.273 0-.512-.053-.72-.156-.687-.321-1.284-.56-1.79-.719a5.487 5.487 0 0 0-1.637-.235c-1.007 0-2.155.326-3.442.978a9.021 9.021 0 0 0-.579.31l-.122-.894c.277-.24.455-.587.455-.981 0-.72-.586-1.305-1.309-1.305-.722 0-1.308.585-1.308 1.305 0 .47.253.878.626 1.109l1.768 12.924a.768.768 0 0 0 .866.656.769.769 0 0 0 .659-.865l-.71-5.193c1.289-.639 2.405-.96 3.343-.96.397 0 .787.059 1.164.179.379.12.695.25.944.39.252.142.548.274.888.392.341.12.678.18 1.01.18.84 0 1.845-.315 3.017-.946.147-.076.255-.151.323-.225.067-.072.102-.177.102-.313v-6.22c0-.14-.05-.263-.155-.367" />
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Flag.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Flag.defaultProps = {
  className: '',
  size: { width: '14px', height: '16px' },
  fill: themeDefault.colors.teal,
};

export default Flag;
