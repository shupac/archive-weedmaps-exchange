import { Tab, WmTheme } from '@ghostgroup/ui';
import styled from 'styled-components';
import { rem } from 'polished';

const { state } = WmTheme.style;

export const TabButton = styled(Tab)`
  padding: 16px;
  > a {
    color: inherit;
    font-size: ${rem(16)};
  }
  border-bottom: 4px solid transparent;
  &.selected-tab {
    transition: border-color 0.3s ease-in-out;
    border-color: ${state.primary};
  }
`;

export default TabButton;
