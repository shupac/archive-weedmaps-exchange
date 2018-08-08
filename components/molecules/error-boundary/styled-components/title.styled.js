import styled from 'styled-components';
import { rem } from 'polished';
import { color } from 'lib/styles/theme-getters';

const Title = styled.span`
  height: ${rem(22)};
  color: ${color('denyRed')};
  font-size: ${rem(16)};
  font-weight: 500;
  line-height: ${rem(16)};
`;

export default Title;
