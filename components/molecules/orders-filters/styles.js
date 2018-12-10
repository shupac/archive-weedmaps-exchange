import styled from 'styled-components';
import { ComboSelect as ComboSelectBase } from '@ghostgroup/ui';

export const FiltersRow = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 1fr) 246px repeat(3, minmax(180px, 1fr));
  grid-gap: 16px;
  margin-bottom: 16px;
`;

export const ComboSelect = styled(ComboSelectBase)`
  div[id^='downshift-'] {
    padding: 10px;
  }
`;
