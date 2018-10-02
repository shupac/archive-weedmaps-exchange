import styled from 'styled-components';
import { rem } from 'polished';
import { WmTheme } from '@ghostgroup/ui';

const { text } = WmTheme.style;

export const BreadcrumbWrap = styled.div`
  display: flex;
  margin: 16px 0;
`;

export const ActiveCrumb = styled.p`
  font-size: ${rem(14)};
  color: ${text.normal};
  margin: 0;
`;
ActiveCrumb.displayName = 'ActiveCrumb';
