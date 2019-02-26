import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';
import { NumericInput } from './index';

const Wrapper = styled.div`
  max-width: 300px;
`;

export default storiesOf('NumericInput', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => (
    <Wrapper>
      <h3>Numeric</h3>
      <NumericInput options={{ numeral: true }} />
    </Wrapper>
  ));
