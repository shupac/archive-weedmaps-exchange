import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

export const TooltipStyle = styled.div`
  display: ${({ hover }) => (hover ? 'block' : 'none')};
  position: relative;
  z-index: 99;
`;

export const SpeechBubble = styled.div`
  min-width: 220px;
  max-width: 400px;
  transform: translateX(-50%) translateY(-100%);
  padding: 16px;
  top: -10px;
  line-height: 21px;
  left: 50%;
  background: ${theme.colors.white};
  position: absolute;
  cursor: pointer;
  border: 1px solid ${theme.colors.border};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${rem(14)};
  font-family: ${theme.text.proximaNovaFont};
  color: ${theme.colors.oxfordBlue};
  :before {
    content: '';
    position: absolute;
    top: 99%;
    left: 50%;
    z-index: -1;
    height: 10px;
    width: 10px;
    background: ${theme.colors.white};
    border-bottom: inherit;
    border-right: inherit;
    transform: rotate(45deg) translate(-50%);
  }
`;
SpeechBubble.displayName = 'SpeechBubble';
