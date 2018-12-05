import styled from 'styled-components';
import { WmTheme } from '@ghostgroup/ui';

const { background, text } = WmTheme.style;

export const PageWrapper = styled.div`
  display: block;
  flex-direction: column;
  padding: 16px;
`;

export const TableWrapper = styled.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${background.secondary};
  font-size: 14px;
  color: ${text.normal};
  > p {
    font-weight: 600;
  }
`;
