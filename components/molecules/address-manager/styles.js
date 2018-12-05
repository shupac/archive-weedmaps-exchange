import { Select, SelectStyles } from '@ghostgroup/ui';
import { ButtonWhite } from 'components/atoms/button';
import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

const { Item, SelectButton } = SelectStyles;

export const AddButton = styled(ButtonWhite)`
  height: 40px;
  box-shadow: none;
  min-width: 180px;
  width: 180px;
  font-size: ${rem(14)};
  letter-spacing: normal;
`;
AddButton.displayName = 'AddButton';

export const AddressDropdown = styled(Select)`
  width: 100%;
  margin-right: 16px;
  ${SelectButton} {
    line-height: ${rem(24)};
    padding: 9px 48px 9px 16px;
  }
  ${Item} {
    font-family: ${theme.text.proximaNovaFont};
    font-size: ${rem(14)};
    line-height: ${rem(24)};
    color: ${theme.colors.oxfordBlue};
    cursor: pointer;
    padding: 9px 16px;
    :hover {
      background-color: ${theme.colors.lightGrey3};
      font-weight: 600;
    }
  }
`;

export const AddressManagerWrapper = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 3px;
  background-color: ${theme.colors.white};
  box-shadow: 0 1px 3px 0 ${theme.colors.shadow.light};
  font-family: ${theme.text.proximaNovaFont};
  color: ${theme.colors.oxfordBlue};
`;

export const AddressManagerHeader = styled.div`
  height: 54px;
  width: 100%;
  border-bottom: 1px solid ${theme.colors.divider};
  border-radius: 3px 3px 0 0;
  background-color: ${theme.colors.athensGray};
  display: flex;
  align-items: center;
  padding-left: 25px;
  font-size: ${rem(20)};
  font-weight: 600;
`;

export const AddressManagerBody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px 24px 24px;
  > select {
    flex-grow: 2;
  }
`;

export const SelectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: ${rem(14)};
  margin: 24px 24px 8px 24px;
  font-weight: 600;
  line-height: ${rem(14)};
  color: ${theme.colors.gullGray};
`;
