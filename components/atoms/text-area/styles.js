import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import { rem } from 'polished';
import theme from 'lib/styles/theme';
import { InputStyles } from 'components/atoms/text-input/styles';

export const StyledArea = styled(TextareaAutosize)`
  ${InputStyles};
  min-height: ${props => props.minHeight || 40}px};
  max-height: ${props => props.maxHeight}px};
  min-width: ${props => props.minWidth || 400}px};
  padding: 8px;
  resize: none;
`;

export const ErrorMessage = styled.div`
  font-size: ${rem(11)};
  color: ${theme.style.state.danger};
  margin-top: 4px;
`;
