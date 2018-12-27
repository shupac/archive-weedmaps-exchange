import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { WmTheme } from '@ghostgroup/ui';

const { background, text, shadow, state, icon } = WmTheme.style;

export const SellerProductsWrapper = styled.div`
  padding: 16px;
  display: flex;
`;

export const Content = styled.div`
  margin-left: 16px;
  flex: 1;
`;

const gridColumns = css`
  display: grid;
  color: ${text.normal};
  grid-template-columns: 5fr 3fr 3fr 2fr 130px;
`;

export const ProductsTable = styled.div`
  margin: 16px 0;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 ${shadow};
  overflow: hidden;
`;

export const TableHeader = styled.div`
  ${gridColumns};
  height: 48px;
  background-color: ${background.secondary};
  font-size: ${rem(12)};
`;

export const TableBody = styled.div`
  ${gridColumns};
  background-color: ${state.light};
  font-size: ${rem(14)};
`;

export const TableFooter = styled.div`
  height: 64px;
  padding: 0 24px;
  background-color: ${background.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${rem(14)};
  font-weight: 600;
`;

export const TableCell = styled.div`
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${icon.inverted};
`;

export const AvatarName = styled.div`
  display: flex;
  margin: 8px 0;
  display: flex;
  align-items: center;

  img {
    flex: 0 0 48px;
    width: 48px;
    height: 48px;
    object-fit: contain;
    object-position: center;
    border: 1px solid ${icon.inverted};
    border-radius: 3px;
    margin-right: 16px;
  }

  a {
    color: ${state.primary};
    text-decoration: none;
  }
`;

export const NoValue = styled.div`
  color: ${state.danger};
`;
