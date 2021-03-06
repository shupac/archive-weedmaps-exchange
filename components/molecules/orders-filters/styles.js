import styled from 'styled-components';
import WmTheme from '@ghostgroup/ui.theme';
import ComboSelectBase from '@ghostgroup/ui.combo-select';

const FiltersRow = styled.div`
  display: grid;
  grid-gap: 16px;
  margin-bottom: 16px;
`;

export const BuyerFiltersRow = styled(FiltersRow)`
  grid-template-columns: minmax(200px, 1fr) 246px repeat(3, minmax(180px, 1fr));
`;

export const SellerFiltersRow = styled(FiltersRow)`
  grid-template-columns: minmax(200px, 1fr) 246px repeat(4, minmax(135px, 1fr));
`;

export const ComboSelect = styled(ComboSelectBase)`
  div[id^='downshift-'] {
    padding: 10px;
  }
  & button {
    background-color: ${WmTheme.style.background.light};
  }
`;
