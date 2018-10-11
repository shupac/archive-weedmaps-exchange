import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

export const GoogleBadge = styled.div`
  display: block;
  border: 1px solid ${theme.colors.border};
  border-top: 0;
  padding: 8px;
  text-align: center;
`;

export const SuggestionListItem = styled.li`
  list-style: none;
  border-top: 0;
  margin-top: 0;
  padding: 10px 10px 10px 36px;
  position: relative;
  font-size: ${rem(14)};
  :last-of-type {
    border-bottom: 1px solid ${theme.colors.border};
  }
  }
  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.lightGrey3};
  }
  &.active {
   background-color: ${theme.colors.border}
`;
SuggestionListItem.displayName = 'SuggestionListItem';

export const SuggestionList = styled.ul`
  background: white;
  margin-top: 0;
  padding-left: 0;
`;

export const AddressSuggestionInput = styled.input.attrs({
  className: 'addressSuggestion',
  autoComplete: 'off',
})`
  border: 1px solid ${theme.colors.border};
  height: 40px;
  width: 100%;
  padding: 0 42px 0 30px;
  color: ${theme.colors.oxfordBlue};
  font-size: ${rem(16)};
  border-radius: 2px;

  &:focus {
    outline: none;
    border: 1px solid ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.border};
    font-style: italic;
  }
`;
AddressSuggestionInput.displayName = 'AddressSuggestionInput';

export const AddressSuggestionWrapper = styled.ul`
  width: 100%;
  padding: 0;
`;
