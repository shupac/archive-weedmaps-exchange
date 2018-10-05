import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';
import { FilterSection } from './';

const Wrapper = styled.div`
  width: 220px;
`;

const mockRouter = {
  query: {},
};

export const options = [
  {
    id: '1',
    name: 'Option 1',
  },
  {
    id: '2',
    name: 'Option 2',
  },
  {
    id: '3',
    name: 'Option 3',
  },
  {
    id: '4',
    name: 'Option 4',
  },
];

export default storiesOf('FilterSection', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => (
    <Wrapper>
      <FilterSection
        paramKey="options"
        title="Options"
        defaultLabel="All Options"
        options={options}
        router={mockRouter}
      />
    </Wrapper>
  ));
