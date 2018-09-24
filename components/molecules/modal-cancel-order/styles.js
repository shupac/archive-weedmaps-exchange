import styled from 'styled-components';
import { rem } from 'polished';

export const ModalBody = styled.div`
  padding: ${rem(4)} ${rem(16)} ${rem(16)};
`;

ModalBody.displayName = 'ModalBody';

export const ButtonRow = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-left: 40%;
`;

ButtonRow.displayName = 'ButtonRow';
