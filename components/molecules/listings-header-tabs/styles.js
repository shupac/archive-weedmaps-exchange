import { Button, Tab, WmTheme } from '@ghostgroup/ui';
import styled from 'styled-components';
import { rem } from 'polished';

const { shadow } = WmTheme.style;
export const AddBusinessButton = styled(Button)`
  font-size: ${rem(14)};
  margin-left: 8px;
  > div {
    margin-right: 8px;
  }
`;

export const ListingHeadersTabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px 0 0;
  box-shadow: 0 1px 3px 0 ${shadow};
`;

export const ListingTab = styled(Tab)`
  width: 160px;
  padding-bottom: 16px;
`;
