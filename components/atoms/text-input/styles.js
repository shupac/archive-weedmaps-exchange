import styled, { css } from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

export const InputStyles = css`
  font-size: ${rem(14)};
  font-weight: 400;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 40}px;
  border: ${props =>
    `1px ${
      props.errorMessage
        ? theme.style.state.danger
        : theme.style.state.secondaryCompanion
    } solid`};
  border-radius: 3px;
  padding: 0 16px;
  background-color: ${({ disabled }) =>
    disabled ? theme.palette.lightGrey3 : theme.style.background.light};
  -webkit-appearance: none;
  &::placeholder {
    color: ${theme.style.state.secondaryCompanion};
    font-style: italic;
  }
  &:focus {
    border-color: ${theme.style.state.primary};
  }
`;

export const StyledInput = styled.input`
  ${InputStyles}
`;

export const ErrorMessage = styled.div`
  font-size: ${rem(11)};
  color: ${theme.style.state.danger};
  margin-top: 4px;
`;
