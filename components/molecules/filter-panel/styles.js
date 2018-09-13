import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

export const Wrapper = styled.div`
  width: 220px;
  background-color: ${theme.colors.white};
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  align-self: baseline;

  > div {
    border-bottom: 1px solid ${theme.colors.divider};

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  padding: 0 16px;
`;

export const Title = styled.div`
  font-size: ${rem(20)};
  font-weight: 600;
  margin-right: auto;
`;

export const Clear = styled.div`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;
