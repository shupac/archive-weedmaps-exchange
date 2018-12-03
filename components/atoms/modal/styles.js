import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

export const ModalContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 3px;
  position: relative;
  pointer-events: auto;
  min-width: 200px;
  color: ${theme.style.text.normal};
`;

export const CloseButton = styled.a`
  position: absolute;
  cursor: pointer;
  top: 16px;
  right: 16px;
  fill: ${theme.style.icon.dark};
  z-index: 2;
`;

export const ModalHeader = styled.div`
  border-bottom: 1px solid ${theme.style.icon.inverted};
  padding: 16px;
  font-size: ${rem(20)};
  font-weight: 600;
  margin: 0;
  user-select: none;
`;

export const ModalContent = styled.div`
  overflow: auto;
`;
