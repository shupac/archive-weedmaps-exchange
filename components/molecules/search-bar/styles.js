import { WmTheme, SelectStyles } from '@ghostgroup/ui';
import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

const { state: WmColor, border } = WmTheme.style;
const { SelectButton } = SelectStyles;

export const SearchBarWrapper = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
`;
SearchBarWrapper.displayName = 'SearchBarWrapper';

export const SearchIcon = styled.div`
  border: 1px solid ${theme.palette.darkTeal};
  border-radius: 0 3px 3px 0;
  background: ${WmColor.primary};
  padding: 10px 12px 12px 12px;
  cursor: pointer;
`;
SearchIcon.displayName = 'SearchIcon';

export const SearchInputText = styled.input`
  ::placeholder {
    color: ${border.default};
    font-style: italic;
  }
  :focus {
    outline: none;
    border: 1px solid ${WmColor.primary};
  }
  width: 100%;
  padding: 0 10px;
  cursor: auto;
  border-style: none;
  font-size: ${rem(14)};
  border-top: 1px solid ${border.default};
  border-bottom: 1px solid ${border.default};
`;
SearchInputText.displayName = 'SearchInputText';

export const SelectWrapper = styled.div`
  width: 150px;
  ${SelectButton} {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    width: 150px;
  }
`;
SelectWrapper.displayName = 'SelectWrapper';
