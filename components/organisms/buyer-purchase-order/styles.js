import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { WmTheme } from '@ghostgroup/ui';
import Theme from 'lib/styles/theme';

const { background, text, border, shadow, icon } = WmTheme.style;

export const PurchaseOrderWrapper = styled.div`
  margin: 16px;
  background: ${background.light};
  border-radius: 3px;
  border: 1px solid ${border.default};
  box-shadow: ${shadow};
  min-width: 1000px;
  height: 100%;

  @media print {
    background: white;
    max-width: 100%;
    min-width: 100%;
    border: unset;
  }
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

  @media print {
    margin-left: -16px;
    padding-left: -16px;
    border-bottom: none;
    svg {
      display: none;
    }
  }
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

  @media print {
    thead {
      color: ${WmTheme.style.text.normal};
    }
    th {
      &:last-of-type {
        display: none;
      }
      &:nth-last-child(2) {
        display: none;
      }
      vertical-align: text-top;
    }
    td {
      &:last-of-type {
        display: none;
      }
      &:nth-last-child(2) {
        display: none;
      }
      color: ${WmTheme.style.text.normal};
      vertical-align: text-top;
    }
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

  @media print {
    display: none;
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

  @media print {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
`;

export const ProductRowWrapper = styled.div`
  ${gridColumnsBody};
  height: 64px;
  border-bottom: 1px solid ${border.default};
  font-size: ${rem(14)};
  padding-right: 32px;
  align-items: center;

  @media print {
    height: 75px;
  }
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

  @media print {
    display: none;
  }
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

  @media print {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    border-bottom: none;
  }
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

export const SellerDetailsWrapper = styled.div`
  width: 620px;
  min-height: 200px;
  display: flex;
  padding: 24px;
  flex-direction: column;
`;

export const DetailsTitle = styled.div`
  font-weight: 600;
  font-size: ${rem(14)};
  color: ${icon.light};
`;

export const DetailDescription = styled.div`
  font-size: ${rem(14)};
  color: ${text.normal};
  margin-top: 7px;
  margin-bottom: 20px;
`;
DetailDescription.displayName = 'DetailDescription';

export const StyledSellerName = styled.div`
  display: block;
  text-decoration: none;
  color: ${WmTheme.style.state.primary};
  cursor: pointer;

  @media print {
    color: ${WmTheme.style.text.normal};
    font-size: ${rem(14)};
  }
`;
StyledSellerName.displayName = 'StyledSellerName';
