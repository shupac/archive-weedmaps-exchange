import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

export const OrderSummaryWrapper = styled.div`
  height: 319px;
  width: 352px;
  border-radius: 3px;
  background-color: ${theme.colors.white};
  box-shadow: 0 1px 3px 0 ${theme.colors.shadow.light};
  font-family: ${theme.text.proximaNovaFont};
  color: ${theme.palette.darkBlue1};
`;

export const OrderSummaryHeader = styled.div`
  height: 54px;
  width: 100%;
  border: 1px solid ${theme.palette.lightGrey1};
  border-radius: 3px 3px 0 0;
  background-color: ${theme.palette.lightGrey4};
  display: flex;
  align-items: center;
  padding-left: 25px;
  font-size: ${rem(20)};
  font-weight: 600;
`;

export const OrderSummaryDetailsWrapper = styled.div`
  margin: 24px;
  > button:last-of-type {
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
  border-top: 1px solid ${theme.palette.lightGrey1};
`;
