// @flow
import React, { Component } from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { rem } from 'polished';
import { color } from 'lib/styles/theme-getters';
import { ArrowDown } from 'components/atoms/icons';

export const SelectionButton = styled.button.attrs({
  type: 'button',
})`
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  height: ${rem(36)};
  min-width: ${props => (props.minWidth ? props.minWidth : 'default')};
  background-color: ${color('white')};
  appearance: none;
  border: 1px solid
    ${props => {
      if (props['aria-expanded']) {
        return color('teal');
      }
      return color('iron');
    }};
  border-radius: ${rem(3)};
  padding-right: ${rem(30)};
  padding-left: ${rem(15)};
  padding-top: ${rem(3)};
  font-size: ${rem(14)};
  font-weight: 300;
  color: ${props => {
    if (props['aria-expanded']) {
      return color('teal');
    }
    return color('aluminum');
  }};
  text-align: left;

  :disabled,
  [disabled] {
    background-color: ${color('iron')};
  }
`;
SelectionButton.defaultProps = {
  theme,
};
SelectionButton.displayName = 'SelectionButton';

export const DownArrowWrapper = styled.div`
  position: relative;
`;

export const DownArrowInnerWrapper = styled.div`
  position: absolute;
  right: -${rem(20)};
  bottom: ${rem(2)};
`;

export const PickerDropdownWrapper = styled.div`
  position: relative;
`;

export const PickerDropdown = styled.div`
  max-height: ${rem(220)};
  min-width: ${props => (props.minWidth ? props.minWidth : 'default')};
  box-sizing: border-box;
  border: 1px solid ${color('silver')};
  box-shadow: ${rem(0)} ${rem(1)} ${rem(4)} ${color('silver')};
  border-radius: 3px;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  top: 3;
  z-index: 10;
`;
PickerDropdown.defaultProps = {
  theme,
};

export const SelectionItem = styled.div`
  cursor: pointer;
  height: ${rem(36)};
  min-width: ${props => (props.minWidth ? props.minWidth : 'default')};
  padding-left: ${rem(16)};
  padding-top: ${rem(10)};
  padding-right: ${rem(16)};
  font-size: 14px;
  font-weight: 300;
  color: ${props =>
    props.isSelected || props.isActive ? color('white') : color('aluminum')};
  background-color: ${props => {
    if (props.isSelected) {
      return color('teal');
    } else if (props.isActive) {
      return color('iron');
    }
    return color('white');
  }};
`;
SelectionItem.defaultProps = {
  theme,
};
SelectionItem.displayName = 'SelectionItem';

type Props = {
  items: any,
  selectedItem?: any,
  onChange: any,
  disabled?: boolean,
  placeholder?: string,
  minWidth?: string,
};

class DropdownPicker extends Component<Props> {
  render() {
    const {
      selectedItem,
      onChange,
      disabled,
      minWidth,
      placeholder,
      items,
    } = this.props;

    return (
      <Downshift
        selectedItem={selectedItem}
        onChange={onChange}
        render={({
          isOpen,
          getButtonProps,
          getItemProps,
          highlightedIndex,
          selectedItem: dsSelectedItem,
        }) => (
          <div>
            <SelectionButton
              {...getButtonProps()}
              disabled={disabled}
              minWidth={minWidth}
            >
              {selectedItem || placeholder}
              <DownArrowWrapper>
                <DownArrowInnerWrapper>
                  <ArrowDown
                    size={{ width: '9px', height: '9px' }}
                    fill={isOpen ? theme.colors.teal : theme.colors.aluminum}
                  />
                </DownArrowInnerWrapper>
              </DownArrowWrapper>
            </SelectionButton>
            <PickerDropdownWrapper>
              {isOpen && (
                <PickerDropdown minWidth={minWidth}>
                  {items.map((item, index) => (
                    <SelectionItem
                      {...getItemProps({
                        item,
                        isActive: highlightedIndex === index,
                        isSelected: dsSelectedItem === item,
                      })}
                      key={item}
                      minWidth={minWidth}
                    >
                      {item}
                    </SelectionItem>
                  ))}
                </PickerDropdown>
              )}
            </PickerDropdownWrapper>
          </div>
        )}
      />
    );
  }
}

export default DropdownPicker;
