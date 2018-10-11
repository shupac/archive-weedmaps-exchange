import theme from 'lib/styles/theme';
import styled from 'styled-components';
import { rem } from 'polished';

export const TopNavContainer = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.smoke};
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const RightContainer = styled.div`
  display: flex;
`;

export const MenuButton = styled.button`
  cursor: pointer;
  appearance: none;
  border: none;
  padding: 0;
  background-color: ${theme.colors.white};
`;

export const NavContent = styled.div`
  display: flex;
  align-items: center;
  font-size: ${rem(20)};
  font-weight: 600;
  font-family: ${theme.text.proximaNovaFont};
  text-transform: uppercase;
  justfiy-content: flex-start;
  margin-left: 16px;
  div {
    margin-right: 8px;
  }
`;
