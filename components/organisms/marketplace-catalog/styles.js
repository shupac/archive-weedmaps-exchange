import styled from 'styled-components';

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

export const NoResults = styled.div`
  width: 100%;
  text-align: center;
`;
