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
  align-items: center;
  justify-content: center;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  span {
    margin-left: 16px;
    font-size: 14px;
    color: ${theme.colors.oxfordBlue};
    user-select: none;
  }
`;

export const PartialCheck = styled.div`
  height: 1.6px;
  width: 8px;
  border-radius: 1px;
  background-color: white;
`;
