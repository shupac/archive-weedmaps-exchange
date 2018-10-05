import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';
import { TreeFilterSection } from './';

const Wrapper = styled.div`
  width: 220px;
`;

const mockRouter = {
  query: {},
};

export const trees = [
  {
    parent: {
      id: '1',
      name: 'Parent 1',
    },
    children: [
      {
        id: '11',
        name: 'Child 1',
      },
      {
        id: '12',
        name: 'Child 2',
      },
      {
        id: '13',
        name: 'Child 3',
      },
    ],
  },
  {
    parent: {
      id: '2',
      name: 'Parent 2',
    },
    children: [
      {
        id: '21',
        name: 'Child 1',
      },
      {
        id: '22',
        name: 'Child 2',
      },
      {
        id: '23',
        name: 'Child 3',
      },
    ],
  },
];

export default storiesOf('TreeFilterSection', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => (
    <Wrapper>
      <TreeFilterSection
        paramKey="options"
        title="Options"
        defaultLabel="All Options"
        trees={trees}
        router={mockRouter}
      />
    </Wrapper>
  ));
