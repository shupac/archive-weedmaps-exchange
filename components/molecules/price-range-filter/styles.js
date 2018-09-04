import styled from 'styled-components';
import { WmTheme } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

const { border } = WmTheme.style;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
`;

export const Seperator = styled.span`
  color: ${border.default};
  margin: 0 2px;
`;

export const ErrorMessage = styled.span`
  display: block;
  height: 20px;
  color: ${theme.colors.red};
  font-size: ${rem(12)};
  margin-bottom: 10px;
`;

ErrorMessage.displayName = 'ErrorMessage';
