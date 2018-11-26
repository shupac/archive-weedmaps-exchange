import styled from 'styled-components';
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
  padding: 10px 10px 10px 16px;
  position: relative;
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
  border: 1px solid
    ${({ error }) =>
      error ? `${theme.colors.red}` : `${theme.colors.blueHaze}`};
  height: 40px;
  width: 100%;
  padding-left: 16px;
  color: ${theme.colors.oxfordBlue};
  border-radius: 3px;

  &:focus {
    outline: none;
    border: 1px solid ${theme.colors.primary};
  }

  &::placeholder {
    font-style: italic;
  }
`;
AddressSuggestionInput.displayName = 'AddressSuggestionInput';

export const AddressSuggestionWrapper = styled.ul`
  width: 100%;
  padding: 0;
`;
