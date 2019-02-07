import styled from 'styled-components';
import { rem } from 'polished';
import WmTheme from '@ghostgroup/ui.theme';

const { text, state } = WmTheme.style;

export const ErrorPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${rem(20)};
  color: ${text.normal};
  text-align: center;
`;

export const ErrorPageContent = styled.div`
  max-height: 600px;
  text-align: center;
  > h1 {
    color: ${text.normal};
    font-size: ${rem(72)};
    padding-top: ${rem(14)};
    line-height: 1;
    font-weight: bold;
  }

  > h2 {
    font-size: ${rem(16)};
    font-weight: bold;
    text-transform: uppercase;
  }

  > p {
    margin-bottom: 20px;
    font-size: ${rem(14)};
    line-height: 1.5;
  }
`;

export const IconWrapper = styled.div`
  align-self: center;
  margin-left: ${rem(20)};
`;

export const StyledLink = styled.a`
  display: block;
  text-decoration: none;
  color: ${state.primary};
  cursor: pointer;
`;
