import styled from 'styled-components';
import { rem } from 'polished';
import WmTheme from '@ghostgroup/ui.theme';

const { background, border, state, shadow } = WmTheme.style;

export const ContextMenuWrapper = styled.div`
  position: relative;

  svg {
    cursor: pointer;
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: -5px;
  right: 0;
  width: 135px;
  padding: 8px 0;
  background-color: ${background.light};
  border: 1px solid ${border.default};
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 ${shadow};
  z-index: 5;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  font-size: ${rem(14)};
  line-height: ${rem(24)};
  padding: 8px 16px 8px;

  &:hover {
    background-color: ${state.grey};
  }
`;
