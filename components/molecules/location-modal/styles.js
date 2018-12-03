import { Select, SelectStyles, WmTheme } from '@ghostgroup/ui';
import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { rem } from 'polished';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';

const { SelectButton, Item } = SelectStyles;

export const LocationModalWrapper = styled.div`
  width: 644px;
  padding: 24px;
`;

export const AddButton = styled(ButtonPrimary)`
  width: 138px;
`;

export const CancelButton = styled(ButtonWhiteNoHover)`
  width: 138px;
`;

export const LicenseTypeWrapper = styled.div``;

export const LabelName = styled.label`
  display: block;
  font-size: ${rem(14)};
  margin-bottom: 8px;
  color: ${theme.colors.gullGray};
`;

export const TrashcanBorder = styled.div`
  padding: 8px;
  border-radius: 3px;
  border: 1px solid ${WmTheme.style.border.default};
  cursor: pointer;
`;

export const LicenseNumberWrapper = styled.div`
  display: flex;
  height: 40px;
`;

export const SelectLocation = styled(Select)`
  width: 297px;
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

export const FormWrapper = styled.div`
  width: 100%;
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  resize: none;
  height: 73px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid ${theme.colors.blueHaze};
  border-radius: 3px;
  ::placeholder {
    font-style: italic;
    font-weight: normal;
  }
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.red};
  margin-bottom: 16px;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 40px;
  margin-right: 16px;
  border: 1px solid
    ${({ error }) =>
      error ? `${theme.colors.red}` : `${theme.colors.blueHaze}`};
  border-radius: 3px;
  margin-bottom: ${({ error }) => (error ? '0' : '16px')};
  padding-left: 16px;
  ::placeholder {
    font-style: italic;
    font-weight: normal;
  }
`;

FormInput.displayName = 'FormInput';

export const FormDivide = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button:first-of-type {
    margin-right: 16px;
  }
  padding: 5px 5px;
`;

export const LabelOnTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  :first-of-type {
    margin-right: 16px;
  }
`;

export const AddLicense = styled.div`
  font-weight: bold;
  font-size: ${rem(14)};
  color: ${theme.colors.primary};
`;

export const AddLicenseButton = styled.button`
  margin: 25px 0px;
  padding: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: left;
  div {
    margin-left: 8px;
  }
  cursor: pointer;
  :disabled {
    g {
      fill: ${theme.colors.divider};
    }
    div {
      color: ${theme.colors.divider};
    }
  }
`;
