import { Tab } from '@ghostgroup/ui';
import styled from 'styled-components';
import { rem } from 'polished';

export const TabButton = styled(Tab)`
  padding: 16px;
  > a {
    color: inherit;
    font-size: ${rem(16)};
  }
`;

export default TabButton;
