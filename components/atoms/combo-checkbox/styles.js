import styled from 'styled-components';
import theme from 'lib/styles/theme';

export const Container = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid;
  border-color: ${({ checked }) =>
    checked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ checked }) =>
    checked ? theme.colors.primary : 'initial'};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

export const PartialCheck = styled.div`
  height: 1.6px;
  width: 8px;
  border-radius: 1px;
  background-color: ${theme.colors.white};
`;
