import styled, { css } from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';
import { WmTheme, Icons } from '@ghostgroup/ui';

const { background, border, text, icon } = WmTheme.style;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 290px 290px;
  padding: 16px;
`;

export const RangeWrapper = styled.div`
  padding: 20px;
  background-color: ${icon.inverted};
`;
