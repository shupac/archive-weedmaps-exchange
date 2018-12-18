// @flow
import styled from 'styled-components';
import { WmTheme } from '@ghostgroup/ui';
import { ButtonBase } from 'components/atoms/button';
import { rem } from 'polished';

const { text, border, icon, state, shadow } = WmTheme.style;

export const UserDropdownContainer = styled.div`
  position: relative;
  align-items: center;
  border-left: 1px solid ${border.default};
  display: flex;
  justify-content: space-around;
  width: ${rem(253)};
  cursor: pointer;
`;

export const DropdownSelector = styled.div`
  width: 100%;
  height: ${rem(60)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${rem(8)} ${rem(16)};
`;
DropdownSelector.displayName = 'DropdownSelector';

export const UserDropdownMenu = styled.div`
  width: 100%;
  position: absolute;
  top: ${rem(60)};
  left: -1px;
  padding: ${rem(16)};
  background-color: ${state.light};
  box-shadow: 0 1px 3px 0 ${shadow};
  border: 1px solid ${icon.inverted};
  border-top: none;
  z-index: 3;
`;
UserDropdownMenu.displayName = 'UserDropdownMenu';

export const Username = styled.div`
  color: ${text.normal};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${rem(110)};
  margin-left: ${rem(8)};
  margin-right: auto;
  > p {
    margin: 0;
    margin-bottom: ${rem(4)};
    text-transform: capitalize;
    &:first-of-type {
      font-weight: 600;
    }
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: ${rem(1)};
  margin: ${rem(16)} 0;
  background-color: ${icon.inverted};
`;

export const LogoutButton = styled.a`
  ${ButtonBase};
  border: 1px solid ${border.default};
  font-weight: 600;
  color: ${text.normal};
  text-decoration: none;
`;
