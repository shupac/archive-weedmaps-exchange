import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Settings = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg
      viewBox="0 0 16 16"
      transform="translate(1)"
      xmlns="http://www.w3.org/2000/svg"
      {...size}
    >
      <g fill="none" fillRule="evenodd" transform="translate(-25 -1099)">
        <g transform="translate(-5)" fill={fill} fillRule="nonzero">
          <path d="M37.65 1109.344c1.51 0 2.762-1.221 2.762-2.694 0-1.473-1.252-2.694-2.762-2.694s-2.761 1.221-2.761 2.694c0 1.473 1.251 2.694 2.761 2.694zm5.855-1.94l1.657 1.258c.147.108.184.323.074.502l-1.584 2.658c-.11.18-.294.215-.479.143l-1.952-.754c-.405.287-.847.575-1.325.754l-.295 2.012c-.037.18-.184.323-.368.323h-3.166c-.185 0-.332-.144-.368-.323l-.295-2.012a4.83 4.83 0 0 1-1.325-.754l-1.952.754c-.185.072-.368.037-.48-.143l-1.583-2.658c-.11-.18-.073-.395.074-.502l1.657-1.258c-.037-.251-.037-.502-.037-.754s0-.503.037-.754l-1.657-1.258c-.147-.108-.184-.323-.074-.502l1.584-2.658c.11-.18.294-.215.479-.143l1.952.754c.405-.287.847-.575 1.325-.754l.295-2.012c.037-.18.184-.323.368-.323h3.166c.185 0 .332.144.368.323l.295 2.012c.479.18.92.43 1.325.754l1.952-.754c.185-.072.368-.037.48.143l1.583 2.658c.11.18.073.395-.074.502l-1.657 1.258c.037.251.037.502.037.754s0 .503-.037.754z" />
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Settings.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Settings.defaultProps = {
  className: '',
  size: { width: '15px', height: '15px' },
  fill: themeDefault.colors.teal,
};

export default Settings;
