import styled, { css } from 'styled-components';
import { rem } from 'polished/lib/index';
import { WmTheme } from '@ghostgroup/ui';

const { shadow, background, text } = WmTheme.style;

const PANEL_TRANSITION_DURATION = 250;

export const PanelContainer = styled.div`
  max-width: ${({ maxWidth }) => maxWidth || '502px'};
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 1;
  overflow: hidden;
  overflow-y: scroll;
  background-color: ${background.light};
  transition: width ${PANEL_TRANSITION_DURATION}ms ease-in-out;
  box-shadow: 0 1px 3px 0 ${shadow};
  ${({ show }) =>
    show
      ? css`
          width: 100%;
        `
      : css`
          width: 0;
        `};
`;

export const ToggleRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
  padding: 0 24px;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  font-size: ${rem(14)};
  font-weight: 600;
  text-transform: uppercase;
  > div {
    margin-left: 8px;
  }
`;

export default { PanelContainer };
