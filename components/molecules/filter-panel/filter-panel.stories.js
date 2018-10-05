import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';
import TreeFilterSection from 'components/molecules/tree-filter-section';
import FilterSection from 'components/molecules/filter-section';
import { trees } from 'components/molecules/tree-filter-section/tree-filter-section.stories';
import { options } from 'components/molecules/filter-section/filter-section.stories';
import FilterPanel from './';

const Wrapper = styled.div`
  width: 220px;
`;

const mockRouter = {
  query: {},
};

export default storiesOf('FilterPanel', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => (
    <Wrapper>
      <FilterPanel onClearAll={() => {}}>
        <TreeFilterSection
          paramKey="trees"
          title="Tree Options"
          defaultLabel="All Tree Options"
          trees={trees}
          router={mockRouter}
        />
        <FilterSection
          paramKey="options"
          title="Options"
          defaultLabel="All Options"
          options={options}
          router={mockRouter}
        />
      </FilterPanel>
    </Wrapper>
  ));
