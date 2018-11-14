import styled from 'styled-components';
import theme from 'lib/styles/theme';

export const Wrapper = styled.div`
  display: flex;
`;

export const Content = styled.div`
  margin-left: 16px;
  flex: 1;
  width: calc(100% - 236px);
`;

export const Products = styled.div`
  margin-top: 16px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(217px, 1fr));
`;

export const Pagination = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${theme.style.text.normal};
`;
