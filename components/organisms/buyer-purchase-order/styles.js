import styled from 'styled-components';
import { WmTheme } from '@ghostgroup/ui';
import { rem } from 'polished';

const { background, shadow, text, border } = WmTheme.style;

export const PurchaseOrderWrapper = styled.div`
  margin: 16px;
  background: ${background.light};
  border-radius: 3px;
  border: 1px solid ${border.default};
  box-shadow: ${shadow};
  height: 100%;
`;

export const PurchaseOrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${rem(20)};
  font-weight: 600;
  color: ${text.normal};
  padding: 16px;
  background: ${background.secondary};
  border-bottom: 1px solid ${border.default};
`;

export const PurchaseOrderDetails = styled.div`
  display: grid;
  background: ${background.light};
`;

export const HeaderButtons = styled.div`
  display: flex;
  button {
    margin-right: 8px;
  }
  button:last-of-type {
    margin-right: 0;
  }
`;
