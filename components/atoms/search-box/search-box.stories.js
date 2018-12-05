import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import centered from '@storybook/addon-centered';
import React from 'react';
import { SearchBox } from './';

const Wrapper = styled.div`
  width: 400px;
`;

const mockHandler = query => {
  console.log('mockHandler ', query);
};

export default storiesOf('SearchBox', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Wrapper>
      <SearchBox onHandleSearch={mockHandler} />
    </Wrapper>
  ));
