import React, { type Node } from 'react';
import { WmTheme } from '@ghostgroup/ui';
import styled from 'styled-components';
import { ButtonBase } from 'components/atoms/button';

const { text, border, state } = WmTheme.style;

const ToggleButtonWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const ToggleButton = styled.button.attrs({
  disabled: props => !!props.isActive,
})`
  ${ButtonBase};
  width: 50%;
  border: 1px solid transparent;
  border-color: ${({ isActive }) =>
    isActive ? state.primary : border.default};
  background-color: ${({ isActive }) =>
    isActive ? state.primary : state.light};
  color: ${({ isActive }) => (isActive ? state.light : text.normal)};
  font-weight: 600;
  &:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
ToggleButton.displayName = 'ToggleButton';

export const ToggleButtons = ({ children }: Node) => (
  <ToggleButtonWrapper>{children}</ToggleButtonWrapper>
);

export default ToggleButtons;
