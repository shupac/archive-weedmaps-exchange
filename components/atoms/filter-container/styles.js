import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

export const Container = styled.div`
  width: 100%;
  background-color: white;
`;

export const Header = styled.div`
  height: 64px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

export const FilterInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

export const FilterName = styled.div`
  color: #354052;
  font-size: ${rem(16)};
  font-weight: 600;
  line-height: ${rem(24)};
  margin-top: -4px;
`;

export const FiltersLabel = styled.div`
  color: ${theme.colors.gullGray};
  font-size: ${rem(12)};
  line-height: ${rem(14)};
  margin-right: 8px;
`;

export const Chevron = styled.div`
  cursor: pointer;
  transform: rotateZ(${({ collapsed }) => (collapsed ? '0deg' : '180deg')});
  transform-origin: center;
  transition: transform 0.3s;
`;

export const Expandable = styled.div`
  margin-right: 4px;
  overflow: ${({ contentHeight, maxHeight }) =>
    contentHeight > maxHeight ? 'auto' : 'hidden'};
  height: ${({ collapsed, contentHeight, maxHeight }) =>
    collapsed ? 0 : Math.min(maxHeight, contentHeight)}px;
  transition: height 0.3s;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.divider};
    border-radius: 2.5px;
  }
`;

export const Filters = styled.div`
  padding: 0 16px;
  padding-bottom: 4px;
`;
