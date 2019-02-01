import styled, { css } from 'styled-components';
import { rem, transparentize } from 'polished';
import { WmTheme, Button } from '@ghostgroup/ui';

const { background, icon, state, text, border } = WmTheme.style;

const ROW_HEIGHT = '77px';

const gridColumns = css`
  display: grid;
  grid-template-columns: repeat(5, 120px);
  grid-column-gap: 40px;
  align-items: center;
  justify-items: start;
  padding: 8px 16px;
  margin: 0 24px;
`;

export const TableWrap = styled.div``;
TableWrap.displayName = 'TableWrap';

export const TableHead = styled.div`
  min-height: 40px;
  ${gridColumns};
  border-bottom: 1px solid ${icon.inverted};
  color: ${icon.light};
  text-transform: uppercase;
  > p {
    font-size: ${rem(12)};
  }
`;

export const ColumnLabel = styled.p`
  display: flex;
  align-items: center;
  color: inherit;
  font-size: ${rem(12)};
  appearance: none;
  border: none;
  padding: 0;
  background-color: transparent;
  text-transform: inherit;
`;

export const TableRow = styled.div`
  min-height: ${ROW_HEIGHT};
  ${gridColumns};
  background-color: white;
  border-bottom: 1px solid ${icon.inverted};
  border-top: none;
  font-size: ${rem(14)};
  color: ${text.normal};
`;
TableRow.displayName = 'TableRow';

export const RowItem = styled.p`
  margin: 0;
  color: ${({ isTeal }) => (isTeal ? `${state.primaryCompanion}` : `inherit`)};
`;

export const Stock = styled.p`
  color: ${({ inStock }) => (inStock ? `inherit` : state.danger)};
`;

export const TotalsRow = styled.div`
  min-height: 48px;

  ${gridColumns};
  > p {
    font-size: ${rem(16)};
    font-weight: 600;
  }
  > p:first-child {
    grid-column: 4;
  }
`;

export const ButtonRow = styled.div`
  border-top: 1px solid ${icon.inverted};
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  background-color: ${background.secondary};
  border-bottom: 1px solid ${icon.inverted};
`;

export const ActionButton = styled(Button)`
  width: 202px;
  height: 44px;
  align-items: center;
  margin-left: 8px;
  font-size: ${rem(14)};
  svg {
    margin-right: 8px;
  }
`;

RowItem.defaultProps = {
  isTeal: false,
};

export const QuantityAlert = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  grid-column: 1 / span 4;
  align-self: center;
  padding: 0 20px;
  margin-top: 16px;
  background-color: ${transparentize(0.9, border.error)};
  border: 1px solid ${border.error};
  border-radius: 3px;
  font-size: ${rem(14)};
  color: ${border.error};
`;
QuantityAlert.displayName = 'QuantityAlert';

export const ResetLink = styled.a`
  margin-left: 5px;
  cursor: pointer;
  text-decoration: underline;
`;
