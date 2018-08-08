import React from 'react';
import { shape, string, bool } from 'prop-types';
import { withTheme } from 'styled-components';
import themeDefault from 'lib/styles/theme';
import IconWrapper from './icon-wrapper.styled';

export const Eye = ({ className, size, fill, inline }) => (
  <IconWrapper className={className} size={size} inline={inline}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...size}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          d="M12.01 9.828c-.937 0-1.696.745-1.696 1.665s.76 1.665 1.696 1.665c.937 0 1.697-.746 1.697-1.665 0-.92-.76-1.665-1.697-1.665m4.801 4.728a7.902 7.902 0 0 0-.05-6.226c1.509 1.054 2.682 2.266 3.393 3.095-1.101 1.263-2.216 2.305-3.343 3.131m-12.945-2.95c1.084-1.247 2.18-2.281 3.283-3.11a7.94 7.94 0 0 0-.559 2.939c0 1.139.245 2.216.67 3.185a19.102 19.102 0 0 1-3.394-3.014m8.145 4.382c-1.965 0-3.564-2.016-3.564-4.495s1.599-4.495 3.564-4.495c1.964 0 3.562 2.016 3.562 4.495s-1.598 4.495-3.562 4.495m9.767-5.248c-.155-.226-3.846-5.52-9.385-5.733-3.552-.144-6.947 1.824-10.12 5.822a1.296 1.296 0 0 0-.04 1.537c.158.223 3.937 5.464 9.504 5.63.092.003.183.004.274.004 3.42 0 6.687-1.93 9.716-5.74a1.295 1.295 0 0 0 .05-1.52"
          id="eyePath"
        />
      </defs>
      <g transform="translate(-2 -5)" fill="none" fillRule="evenodd">
        <mask id="eyeMask" fill={fill}>
          <use xlinkHref="#eyePath" />
        </mask>
        <use xlinkHref="#eyePath" />
        <g mask="url(#eyeMask)" fill={fill}>
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  </IconWrapper>
);

Eye.propTypes = {
  className: string,
  size: shape({ width: string, height: string }),
  fill: string,
  inline: bool,
};

Eye.defaultProps = {
  className: '',
  size: { width: '20px', height: '13px' },
  fill: themeDefault.colors.white,
  inline: false,
};

export default withTheme(Eye);
