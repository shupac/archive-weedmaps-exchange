import { WmTheme } from '@ghostgroup/ui';
import styled from 'styled-components';
import { rem } from 'polished';
import { ButtonPrimary } from 'components/atoms/button';

const { text, background, icon } = WmTheme.style;

export const OrderWrapper = styled.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  overflow: hidden;
  color: ${text.normal};
`;

export const OrderHeader = styled.div`
  height: 54px;
  line-height: 54px;
  padding: 0 24px;
  background: ${background.secondary};
  border-bottom: 1px solid ${icon.inverted};
  color: #354052;
  font-size: ${rem(20)};
  font-weight: 600;
`;

export const PurchaseOrders = styled.div`
  padding-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
`;

export const POWrapper = styled.div`
  flex: 1 0 300px;
  padding: 24px;
  font-size: ${rem(14)};
  line-height: ${rem(20)};
`;

export const POHeader = styled.div`
  font-size: ${rem(16)};
  font-weight: 600;
  margin-bottom: 16px;
`;

export const POButton = styled(ButtonPrimary)`
  width: 230px;
  font-size: ${rem(14)};
  margin-top: 24px;
`;
