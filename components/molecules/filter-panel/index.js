// @flow
import React, { type Node } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';
import theme from 'lib/styles/theme';

const Wrapper = styled.div`
  width: 220px;
  background-color: ${theme.colors.white};
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;

  > div {
    border-bottom: 1px solid ${theme.colors.divider};

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

const Header = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  padding: 0 16px;
`;

const Title = styled.div`
  font-size: ${rem(20)};
  font-weight: 600;
  margin-right: auto;
`;

const Clear = styled.div`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

type Props = {
  children: Array<Node>,
  onClear: () => void,
};

const FilterPanel = ({ children, onClear }: Props) => (
  <Wrapper>
    <Header>
      <Title>Filters</Title>
      <Clear onClick={onClear}>Clear All</Clear>
    </Header>
    {children}
  </Wrapper>
);

export default FilterPanel;
