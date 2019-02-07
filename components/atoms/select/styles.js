// @flow
import type { ComponentType } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import WmTheme from '@ghostgroup/ui.theme';
// $FlowFixMe
import Icons from '@ghostgroup/ui.icons';

const { border, text, state, background, shadow } = WmTheme.style;
const BUTTON_HEIGHT = '40px';

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 150px;

  > div {
    width: 100%;
  }
`;

export type SelectButtonTypes = {
  isOpen: boolean,
  hasError: boolean,
};

// $FlowFixMe
export const SelectButton = (styled.button`
  width: 100%;
  height: ${BUTTON_HEIGHT};
  display: flex;
  align-items: center;
  padding-right: 33px;
  padding-left: 16px;
  border: 1px solid ${border.default};
  border-radius: 3px;
  outline: none;
  font-size: ${rem(14)};
  font-weight: 400;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  &:focus {
    border: 1px solid ${border.focused};
  }
  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${border.error};
    `};
  ${({ isOpen }) =>
    isOpen &&
    css`
      border-color: ${border.focused};
    `};
`: ComponentType<SelectButtonTypes>);

export type SelectArrowTypes = {
  isOpen: boolean,
  className?: string,
  fill?: string,
  size?: string,
  rotate?: string,
};

export const SelectArrow = (styled(Icons.Arrow)`
  position: absolute;
  top: 15px;
  right: 17px;
  transition: transform 0.3s ease;
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `};
`: ComponentType<SelectArrowTypes>);

export type ItemTypes = {
  isActive: boolean,
  isSelected: boolean,
};

// $FlowFixMe
export const Item = (styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-size: ${rem(14)};
  font-weight: 400;
  color: ${text.normal};
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  cursor: pointer;
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${state.grey};
    `};
  ${({ isSelected }) =>
    isSelected &&
    css`
      color: ${state.primary};
    `};
`: ComponentType<ItemTypes>);

export const Menu = styled.div`
  max-height: 600px;
  width: 100%;
  min-width: 150px;
  position: absolute;
  left: 0;
  top: calc(${BUTTON_HEIGHT} + 5px);
  background-color: ${background.light};
  border-radius: 3px;
  border: 1px solid ${border.default};
  box-shadow: 0 1px 3px 0 ${shadow};
  overflow-y: auto;
  box-sizing: border-box;
  z-index: 10;
`;
