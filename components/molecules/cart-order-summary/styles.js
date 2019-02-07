import styled from 'styled-components';
import WmTheme from '@ghostgroup/ui.theme';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

const { border, state, background, icon, text, shadow } = WmTheme.style;

export const ErrorMessage = styled.div`
  border: 1px solid ${border.error};
  border-radius: 3px;
  background-color: ${theme.colors.bg.error};
  color: ${state.danger};
  font-size: ${rem(14)};
  padding: 8px 19px;
  margin-bottom: 8px;
  :last-of-type {
    margin-bottom: 0;
  }
`;
ErrorMessage.displayName = 'ErrorMessage';

export const OrderSummaryWrapper = styled.div`
  width: 352px;
  border-radius: 3px;
  background-color: ${background.light};
  box-shadow: 0 1px 3px 0 ${shadow};
  color: ${text.normal};
`;

export const OrderSummaryHeader = styled.div`
  height: 54px;
  width: 100%;
  border-bottom: 1px solid ${icon.inverted};
  border-radius: 3px 3px 0 0;
  background-color: ${background.secondary};
  display: flex;
  align-items: center;
  padding-left: 25px;
  font-size: ${rem(20)};
  font-weight: 600;
`;

export const OrderSummaryDetailsWrapper = styled.div`
  margin: 24px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  > a {
    margin-top: 16px;
  }
`;

export const OrderDetail = styled.div`
  font-size: ${rem(14)};
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
  > span {
    font-weight: bold;
  }
`;

export const OrderTotalDetail = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  > span {
    font-weight: bold;
  }
  margin: 16px 0;
  padding-top: 16px;
  border-top: 1px solid ${icon.inverted};
`;

export const ContinueWrapper = styled.div`
  margin-top: 16px;
`;

export const Asterisk = styled.div`
  font-size: ${rem(14)};
`;
