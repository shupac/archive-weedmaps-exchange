import styled from 'styled-components';

import { WmTheme } from '@ghostgroup/ui';

const { icon } = WmTheme.style;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 290px 290px;
  padding: 16px;
`;

export const RangeWrapper = styled.div`
  padding: 20px;
  background-color: ${icon.inverted};
`;
