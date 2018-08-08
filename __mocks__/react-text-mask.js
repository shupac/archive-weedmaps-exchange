import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

export const MaskedDate = styled.input.attrs({
  mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  keepCharPositions: true,
  placeholderChar: '\u2000',
})`
  margin: 8px 0;
  padding: 0 16px;
  height: 48px;
  width: 100%;
  border: 1px solid ${theme.colors.inputBorder};
  border-radius: 2px;
  background-color: ${theme.colors.white};
  ::placeholder {
    color: ${theme.colors.placeholder};
    font-size: ${rem(16)};
  }
`;

MaskedDate.defaultProps = {
  theme,
};

export default MaskedDate;
