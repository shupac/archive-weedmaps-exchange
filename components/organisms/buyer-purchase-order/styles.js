import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { WmTheme } from '@ghostgroup/ui';
import Theme from 'lib/styles/theme';

const { background, text, border, shadow, state } = WmTheme.style;

export const PurchaseOrderWrapper = styled.div`
  margin: 16px;
  background: ${background.light};
  border-radius: 3px;
  border: 1px solid ${border.default};
  box-shadow: ${shadow};
  min-width: 1000px;
  height: 100%;
`;

export const OrderHeader = styled.div`
  display: flex;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  font-size: ${rem(20)};
  font-weight: 600;
  color: ${text.normal};
  background: ${background.secondary};
  border-bottom: 1px solid ${border.default};
`;

export const OrderInfo = styled.div`
  padding: 16px;
  background: ${background.light};
  border-bottom: 1px solid ${border.default};
  font-size: ${rem(14)};

  table {
    border-collapse: separate;
    border-spacing: 0 8px;
  }

  th {
    color: ${Theme.colors.gullGray};
    font-weight: 600;
    text-align: left;
    padding-right: 48px;
    &:last-of-type {
      padding-right: 0;
    }
  }

  td {
    padding-right: 48px;
    vertical-align: top;
    max-width: 400px;
  }
`;

export const HeaderButtons = styled.div`
  margin-left: auto;
  display: flex;
  button {
    height: 32px;
    margin-right: 8px;
    white-space: nowrap;
  }
  button:last-of-type {
    margin-right: 0;
  }
`;

const gridColumnsBody = css`
  display: grid;
  color: ${text.normal};
  grid-template-columns: 2fr 1fr 1fr 1fr 110px;
  grid-column-gap: 8px;
`;

export const ProductsLabels = styled.div`
  ${gridColumnsBody} height: 40px;
  background-color: ${background.secondary};
  text-transform: uppercase;
  font-size: ${rem(12)};
  font-weight: 600;
  color: ${Theme.colors.gullGray};
  border-bottom: 1px solid ${border.default};
  padding-right: 32px;
  align-items: center;

  > :first-child {
    padding-left: 16px;
  }
  > :last-child {
    text-align: right;
  }
`;

export const ProductRowWrapper = styled.div`
  ${gridColumnsBody};
  height: 64px;
  border-bottom: 1px solid ${border.default};
  font-size: ${rem(14)};
  padding-right: 32px;
  align-items: center;
`;

export const ProductWrapper = styled.div`
  display: flex;
  padding-left: 16px;
  a {
    display: flex;
    text-decoration: none;
    color: inherit;
  }
`;

export const ProductDescription = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  line-height: ${rem(21)};
  span:first-of-type {
    font-weight: bold;
  }
`;

export const ProductPhoto = styled.div`
  flex-shrink: 0;
  height: 48px;
  width: 48px;
  border-radius: 3px;
  border: 1px solid ${border.default};
  background-color: ${background.light};
  background-size: cover;
  background-position: center center;
  margin-right: 8px;
`;

export const Subtotal = styled.div`
  font-weight: 600;
  text-align: right;
  justify-content: flex-end;
`;

export const Totals = styled.div`
  background-color: ${background.secondary};
  margin-bottom: 16px;
  padding: 24px 0;
  border-bottom: 1px solid ${border.default};
`;

export const TotalsRow = styled.div`
  ${gridColumnsBody}
  background-color: ${background.secondary};
  font-size: ${rem(14)};
  padding-bottom: 16px;
  padding-right: 32px;

  &:last-of-type {
    font-weight: 600;
    padding-bottom: 0;
  }
`;

export const TotalLabel = styled.div`
  grid-column: 4;
`;

export const TotalDivider = styled.div`
  grid-column: 4/-1;
  border-bottom: 1px solid ${border.default};
`;

export const CancelModalWrapper = styled.div`
  width: 620px;
  padding: 24px;
  font-size: ${rem(14)};
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;

  > button {
    width: auto;
    min-width: 132px;
    margin-right: 16px;
  }

  > :last-child {
    margin-right: 0;
  }
`;

export const ErrorText = styled.small`
  margin-top: 8px;
  font-size: ${rem(12)};
  color: ${state.danger};
`;
