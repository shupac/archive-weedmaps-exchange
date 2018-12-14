import styled from 'styled-components';
import { rem } from 'polished';
import { WmTheme } from '@ghostgroup/ui';

const { text } = WmTheme;

export const ModalContentWrapper = styled.div`
  width: 620px;
  padding: 24px;
  color: ${text.normal};
  font-size: ${rem(14)};
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;

  > button {
    width: auto;
    min-width: 132px;
    margin-right: 16px;
  }

  > :last-child {
    margin-right: 0;
  }
`;
