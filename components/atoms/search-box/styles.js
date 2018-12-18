import styled from 'styled-components';
import { rem } from 'polished';
import { Icons, WmTheme } from '@ghostgroup/ui';
import React from 'react';

const { text, border, icon, state } = WmTheme.style;
const { Search, Close } = Icons;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InputText = styled.input`
  padding: 0 ${rem(32)};
  height: ${rem(40)};
  width: 100%;
  color: ${text.normal};
  border: ${rem(1)} solid ${border.default};
  border-radius: ${rem(2)};
  background-color: ${state.light};
  ::placeholder {
    letter-spacing: ${rem(0.2)};
    color: ${icon.light};
    font-size: ${rem(14)};
    font-style: italic;
  }
  &:focus {
    border-color: ${border.focused};
  }
`;
InputText.displayName = 'InputText';

export const InputButton = styled.button`
  position: absolute;
  margin: 0;
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

export const SearchSubmit = styled(InputButton)`
  top: ${rem(10)};
  left: ${rem(4)};
`;
SearchSubmit.displayName = 'SearchSubmit';

export const SearchClear = styled(InputButton)`
  top: ${rem(12)};
  right: ${rem(4)};
`;
SearchClear.displayName = 'SearchClear';

export const SearchIcon = ({ isActive }: boolean) => (
  <Search fill={isActive ? state.primary : icon.dark} size="16px" />
);

export const CloseIcon = () => <Close fill={icon.dark} size="12px" />;
