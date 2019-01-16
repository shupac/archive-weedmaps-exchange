import styled from 'styled-components';
import { WmTheme } from '@ghostgroup/ui';
import { rem } from 'polished';

const { background, text, icon, shadow, border } = WmTheme.style;

export const HelpWrapper = styled.div`
  overflow: hidden;
  background-color: ${background.light};
  margin: 16px;
  color: ${text.normal};
  height: 100%;
  box-shadow: 0 1px 3px 0 ${shadow};
  border-radius: 3px;
`;

export const HelpTitle = styled.div`
  height: 54px;
  background-color: ${background.secondary};
  padding: 16px 24px;
  font-size: ${rem(22)};
  font-weight: 600;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 1px 0 0 ${icon.inverted};
`;

export const HelpContent = styled.div`
  padding: 24px;
  font-size: 14px;
  height: 100%;
`;

export const HelpContactText = styled.div`
  color: ${icon.light};
  font-weight: 600;
  margin: 24px 0 8px 0;
`;

export const EmailLink = styled.a`
  color: ${border.focused};
  text-decoration: none;
`;
