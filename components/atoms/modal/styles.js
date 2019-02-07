import styled from 'styled-components';
import WmTheme from '@ghostgroup/ui.theme';
import { rem } from 'polished';

const { text, state, icon } = WmTheme.style;

export const ModalContainer = styled.div`
  background-color: ${state.light};
  border-radius: 3px;
  position: relative;
  pointer-events: auto;
  min-width: 200px;
  color: ${text.normal};
`;

export const CloseButton = styled.a`
  position: absolute;
  cursor: pointer;
  top: 16px;
  right: 16px;
  fill: ${icon.dark};
  z-index: 2;
`;

export const ModalHeader = styled.div`
  border-bottom: 1px solid ${icon.inverted};
  padding: 16px;
  font-size: ${rem(20)};
  font-weight: 600;
  margin: 0;
  user-select: none;
`;

export const ModalContent = styled.div`
  overflow: auto;
`;

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
