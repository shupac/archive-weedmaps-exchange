// @flow
import React, { type Node } from 'react';
import { Wrapper, Header, Title, Clear } from './styles';

type Props = {
  children: Array<Node>,
  onClearAll: () => void,
};

const FilterPanel = ({ children, onClearAll }: Props) => (
  <Wrapper>
    <Header>
      <Title>Filters</Title>
      <Clear onClick={onClearAll}>Clear All</Clear>
    </Header>
    {children}
  </Wrapper>
);

export default FilterPanel;
