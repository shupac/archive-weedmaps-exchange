import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

export const CategoryCardWrapper = styled.div`
  height: 163px;
  width: 217px;
  border: 1px solid ${theme.colors.blueHaze};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: inset 0 0 0 100px ${theme.colors.shadow.dark};
`;

export const CategoryCardTitle = styled.span`
  height: 15px;
  width: 119px;
  text-align: center;
  font-size: 20px;
  letter-spacing: ${rem(0.05)};
  line-height: ${rem(15)};
  font-family: ${theme.text.proximaNovaFont};
  color: ${theme.colors.white};
  font-weight: 300;
  margin-top: 15px;
`;
