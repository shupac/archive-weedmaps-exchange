import styled from 'styled-components';

export const ProductDetailWrapper = styled.div`
  max-width: 1170px;
  margin: 0 auto;
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-column-gap: 16px;
`;

export const MainPanel = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
