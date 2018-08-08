import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${rem(16)} 0;
  background-color: ${theme.colors.divider};
`;

export default Divider;
