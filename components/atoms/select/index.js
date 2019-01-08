// @flow
import * as React from 'react';
import Downshift from 'downshift';
import * as Styled from './styles';

type Item = {
  text: string,
  value: string,
  icon?: ?React.Element<any>,
};

type Props = {
  items: Item[],
  buttonId?: any,
  dropdownLabel?: string,
  placeholder: string,
  isInverted?: boolean,
  hasError?: boolean,
  initialSelection?: Item,
  className?: string,
  onBlur?: () => void,
  onFocus?: () => void,
  autoFocus?: boolean,
};

export const Select = ({
  items,
  buttonId,
  dropdownLabel,
  placeholder,
  isInverted,
  initialSelection,
  hasError,
  className,
  onBlur,
  onFocus,
  autoFocus,
  ...rest
}: Props) => (
  <Styled.SelectWrapper className={className}>
    <Downshift
      data-test-id="ui-select"
      defaultSelectedItem={initialSelection}
      {...rest}
    >
      {({
        getItemProps,
        getToggleButtonProps,
        isOpen,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <Styled.SelectButton
            data-test-id="ui-select-button"
            {...getToggleButtonProps({
              'aria-label': isOpen
                ? `close ${dropdownLabel || ''} menu`
                : `open ${dropdownLabel || ''} menu`,
              onFocus: () => onFocus && onFocus(),
              onBlur: () => onBlur && onBlur(),
              isOpen,
              hasError,
              autoFocus,
              ...(buttonId && { id: buttonId }),
            })}
          >
            {selectedItem && selectedItem.icon}
            {(selectedItem && selectedItem.text) || (placeholder || 'Select')}
            <Styled.SelectArrow isOpen={isOpen} />
          </Styled.SelectButton>
          {isOpen && (
            <Styled.Menu isInverted={isInverted}>
              {items.map((item, index) => (
                <Styled.Item
                  key={item.text}
                  {...getItemProps({
                    item,
                    index,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item,
                  })}
                >
                  {item.icon && item.icon}
                  {item.text}
                </Styled.Item>
              ))}
            </Styled.Menu>
          )}
        </div>
      )}
    </Downshift>
  </Styled.SelectWrapper>
);

Select.defaultProps = {
  isInverted: false,
  hasError: false,
  autoFocus: false,
};

export default Select;
