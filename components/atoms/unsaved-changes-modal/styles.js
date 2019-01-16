import styled from 'styled-components';
import { rem } from 'polished';

export const UnsavedChanges = styled.div`
  width: 620px;
  padding: 24px;
  font-size: ${rem(14)};

  div {
    margin-bottom: 24px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-column-gap: 16px;
  justify-content: end;
`;
