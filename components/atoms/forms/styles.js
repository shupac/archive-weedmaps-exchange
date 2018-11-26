import styled, { css } from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

const InputStyles = css`
  font-size: ${rem(14)};
  font-weight: 300;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 40}px;
  border: 1px ${theme.style.state.secondaryCompanion} solid;
  border-radius: 3px;
  padding: 0 16px;
  background-color: ${({ disabled }) =>
    disabled ? theme.palette.lightGrey3 : theme.style.background.light};
  -webkit-appearance: none;
  ${({ hasError }) => hasError && `border-color: ${theme.style.state.danger}`};
  &::placeholder {
    color: ${theme.style.state.secondaryCompanion};
    font-style: italic;
  }
  &:focus {
    border-color: ${theme.style.state.primary};
  }
`;

const AreaStyles = css`
  resize: none;
  font-size: ${rem(14)};
  font-weight: 300;
  width: 100%;
  height: ${props => props.height || 72}px;
  border: 1px ${theme.style.state.secondaryCompanion} solid;
  border-radius: 3px;
  padding: 16px;
  background-color: ${({ disabled }) =>
    disabled ? theme.palette.lightGrey3 : theme.style.background.light};
  -webkit-appearance: none;
  ${({ hasError }) => hasError && `border-color: ${theme.style.state.danger}`};
  &::placeholder {
    color: ${theme.style.state.secondaryCompanion};
    font-style: italic;
  }
  &:focus {
    border-color: ${theme.style.state.primary};
  }
`;

AreaStyles.defaultProps = {
  hasError: false,
};

InputStyles.defaultProps = {
  hasError: false,
};

export const StyledInput = styled.input`
  ${InputStyles};
`;

export const StyledArea = styled.textarea`
  ${AreaStyles};
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const InputError = styled.small`
  position: absolute;
  left: 0;
  bottom: -13px;
  font-size: ${rem(11)};
  color: ${theme.style.state.danger};
`;
