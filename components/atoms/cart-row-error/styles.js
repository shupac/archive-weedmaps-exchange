import styled from 'styled-components';
import { WmTheme } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

const { border, state } = WmTheme.style;

const AlertDanger = styled.div`
  width: 100%;
  border: 1px solid ${border.error};
  border-radius: 3px;
  background-color: ${theme.colors.bg.error};
  margin: 16px 16px 0 16px;
  grid-column: 1/3;
  padding: 8px 16px;
  font-size: ${rem(14)};
  color: ${state.danger};
  > span {
    margin-right: 4px;
  }
  > a {
    margin-left: 4px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default AlertDanger;
