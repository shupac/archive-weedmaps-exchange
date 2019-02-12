import WmTheme from '@ghostgroup/ui.theme';
import SelectBase, { SelectStyles } from '@ghostgroup/ui.select';
import styled from 'styled-components';

const { Item, SelectButton } = SelectStyles;
const { state } = WmTheme.style;

export const SelectWrapper = styled.div`
  position: relative;
  min-width: 200px;
  margin-left: auto;
  margin-right: 16px;
  > svg {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }
`;

export const Select = styled(SelectBase)`
  ${Item} {
    :hover {
      color: ${state.primaryCompanion};
    }
  }
  ${SelectButton} {
    padding: 0 40px 0 10px;
  }
`;
