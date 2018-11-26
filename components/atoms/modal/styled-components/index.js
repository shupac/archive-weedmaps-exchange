import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

export const ModalContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 3px;
  position: relative;
  pointer-events: auto;
  min-width: 200px;
  max-height: 1000px;
  overflow-y: scroll;
`;

export const CloseButton = styled.a`
  position: absolute;
  cursor: pointer;
  top: 16px;
  right: 16px;
`;

export const ModalBackdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const ModalHeader = styled.h4`
  border-bottom: 1px solid ${theme.style.icon.inverted};
  padding: ${rem(16)};
  margin: 0;
  user-select: none;
`;
export const ModalOverlay = styled.div`
  padding: 60px;
`;
