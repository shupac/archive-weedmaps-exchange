import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { WmTheme } from '@ghostgroup/ui';

const { background, icon, text, state } = WmTheme.style;

const gridColumns = css`
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr) 120px 20px;
  grid-column-gap: 16px;
  align-items: center;
  min-width: ${rem(900)};
  padding: ${rem(8)} ${rem(16)};
`;
const HEADER_HEIGHT = '48px';

const headerStyle = css`
  width: 100%;
  height: ${HEADER_HEIGHT};
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${background.secondary};
  border-bottom: 1px solid ${icon.inverted};
`;

export const Table = styled.div`
  ${gridColumns};
  position: relative;
  padding: 0 24px;
  color: ${text.normal};
  background-color: ${state.light};
  border: 1px solid ${icon.inverted};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  > p,
  > a {
    font-size: ${rem(14)};
    margin: 0;
  }
`;

export const HeadCol = styled.div`
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  z-index: 1;
`;

export const Border = styled.div`
  grid-column: 1/-1;
  height: 1px;
  margin: 16px 0;
  background-color: ${icon.inverted};
  &:first-child {
    margin-top: 16px;
  }
  &:last-child {
    margin: 0 0 16px 0;
    background-color: transparent;
  }
`;

export const ActionHead = styled.div`
  ${headerStyle};
  z-index: ${({ isVisible }) => (isVisible ? 2 : 0)};
`;
