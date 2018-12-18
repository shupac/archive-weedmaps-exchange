import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';

import ToggleButtons, { ToggleButton } from './';

const Wrapper = styled.div`
  width: 400px;
  padding: 20px;
`;

export default storiesOf('ToggleButtons', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => (
    <Wrapper>
      <ToggleButtons>
        <ToggleButton>Buyer</ToggleButton>
        <ToggleButton isActive>Seller</ToggleButton>
      </ToggleButtons>
    </Wrapper>
  ));
