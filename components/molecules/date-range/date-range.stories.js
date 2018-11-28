import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';
import DateRange from './';

const Wrapper = styled.div`
  width: 700px;
  padding: 20px;
`;

export default storiesOf('Date Range', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Wrapper>
      <DateRange />
    </Wrapper>
  ));
