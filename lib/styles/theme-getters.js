import get from 'lodash.get';

export const themeColor = color => ({ theme }) => get(theme, `colors.${color}`);
export const themeDimension = dimension => ({ theme }) =>
  get(theme, `dimensions.${dimension}`);
export const themeText = text => ({ theme }) => get(theme, `text.${text}`);
export const themeBreakpoint = breakpoint => ({ theme }) =>
  [0, ...theme.breakpoints][theme.breakpointNames.indexOf(breakpoint)];

export { themeColor as color };
export { themeDimension as dimension };
export { themeText as text };
export { themeBreakpoint as breakpoint };
