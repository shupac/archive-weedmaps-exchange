import styled from 'styled-components';
import { transparentize } from 'polished';

const ColorKey = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 16px;
  border-radius: 50%;
  border: 1px solid ${({ color }) => color};
  background-color: ${({ color }) => transparentize(0.6, color)};
`;

export default ColorKey;
