import React from 'react';
import { shape, string } from 'prop-types';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Photo = ({ className, size, fill }) => (
  <IconWrapper className={className} size={size}>
    <svg xmlns="http://www.w3.org/2000/svg" {...size}>
      <path
        d="M5.885 6.847V.962H9.81v5.885h5.885v3.924H9.81v5.885H5.885V10.77H0V6.847h5.885zm5.886 11.77v-5.885h5.885V6.847h13.732l3.59 3.924h6.22a3.935 3.935 0 0 1 3.923 3.923v23.541a3.935 3.935 0 0 1-3.924 3.924H9.81a3.935 3.935 0 0 1-3.924-3.924V18.618h5.886zm13.732 17.657c5.414 0 9.809-4.395 9.809-9.81 0-5.414-4.395-9.808-9.809-9.808-5.415 0-9.809 4.394-9.809 9.809 0 5.414 4.394 9.809 9.809 9.809zm-6.278-9.81a6.27 6.27 0 0 0 6.278 6.278 6.27 6.27 0 0 0 6.278-6.277 6.27 6.27 0 0 0-6.278-6.278 6.27 6.27 0 0 0-6.278 6.278z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  </IconWrapper>
);

Photo.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
};

Photo.defaultProps = {
  className: '',
  size: { width: '46px', height: '43px' },
  fill: themeDefault.colors.iron,
};

export default Photo;
