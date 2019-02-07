import styled from 'styled-components';
import { rem } from 'polished';
import WmTheme from '@ghostgroup/ui.theme';

const { state } = WmTheme.style;

export const CancelModalWrapper = styled.div`
  width: 620px;
  padding: 24px;
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

export const ErrorText = styled.small`
  margin-top: 8px;
  font-size: ${rem(12)};
  color: ${state.danger};
`;
ErrorText.displayName = 'ErrorText';
