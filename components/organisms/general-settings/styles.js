import styled from 'styled-components';
import { rem } from 'polished';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import WmTheme from '@ghostgroup/ui.theme';
import { Flex as StyledFlex } from '@ghostgroup/grid-styled';

const { background, shadow, text, icon, state } = WmTheme.style;

export const Flex = styled(StyledFlex)`
  align-items: center;
`;

export const GeneralWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: ${background.light};
  margin: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 ${shadow};
  border-radius: 3px;
  color: ${text.normal};
`;

export const GeneralHeader = styled.div`
  border-bottom: 1px solid ${icon.inverted};
  padding: 16px 24px;
  background-color: ${background.secondary};
  font-size: ${rem(22)};
  font-weight: 600;
`;

export const GeneralBody = styled.div`
  padding: 24px;
  flex: 1;
`;

export const ShippingHeader = styled.div`
  font-size: ${rem(20)};
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 1px solid ${icon.inverted};
`;

export const ShippingMinInputWrapper = styled.div`
  width: 300px;
  margin: 24px 0 32px 0;
  color: ${icon.light};
  font-size: ${rem(14)};
  display: flex;
  flex-direction: column;
  &:first-of-type {
    margin-right: 16px;
  }
`;

export const ShippingETAWrapper = styled.div`
  width: 150px;
  margin: 24px 0 6px 0;
  color: ${icon.light};
  font-size: ${rem(14)};
  display: flex;
  flex-direction: column;
  &:nth-of-type(3n + 1) {
    margin-right: 8px;
  }
  &:nth-of-type(3) {
    margin: 34px 16px 0 16px;
    align-items: center;
    width: unset;
  }
`;

export const GeneralFooter = styled.div`
  background-color: ${background.secondary};
  border-top: 1px solid ${icon.inverted};
  padding: 16px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button:first-of-type {
    margin-right: 16px;
  }
  padding: 5px 5px;
`;

export const CancelButton = styled(ButtonWhiteNoHover)`
  width: 138px;
`;

export const AddButton = styled(ButtonPrimary)`
  width: 138px;
`;

export const InputTitle = styled.div`
  margin-bottom: 4px;
`;

export const ErrorMessage = styled.div`
  font-size: ${rem(12)};
  color: ${state.danger};
`;
