import { css } from 'styled-components';

export const sizes = {
  medium: 640,
  mlarge: 816,
  large: 1024,
  xlarge: 1200,
  xxlarge: 1440,
};

export default Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
