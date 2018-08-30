// @flow
import React from 'react';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

type Props = {
  className?: string,
  size?: {
    width: string,
    height: string,
  },
  fill?: string,
};

export const Check = ({ className, size, fill }: Props) => (
  <IconWrapper className={className} size={size}>
    <svg {...size} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-3.000000, -4.000000)">
        <path
          id="Checkmark"
          fill={fill}
          fillRule="nonzero"
          d="M6.5,12.806c-0.268,0-0.525-0.107-0.713-0.299l-2.5-2.545C2.899,9.567,2.905,8.935,3.299,8.548 C3.692,8.16,4.326,8.167,4.713,8.561L6.5,10.379l4.786-4.873c0.388-0.394,1.02-0.4,1.415-0.013 c0.394,0.387,0.399,1.02,0.013,1.414l-5.5,5.6C7.025,12.698,6.769,12.806,6.5,12.806z"
        />
      </g>
    </svg>
  </IconWrapper>
);

Check.defaultProps = {
  className: '',
  size: { width: '16px', height: '16px' },
  fill: themeDefault.colors.teal,
};

export default Check;
