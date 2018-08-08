import React from 'react';
import { storiesOf } from '@storybook/react';
import storybookBackgrounds from 'lib/common/storybook-backgrounds';
import styled from 'styled-components';

import Divider from './';

const Wrapper = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 373px;
`;

export default storiesOf('Divider', module)
  .addDecorator(storybookBackgrounds())
  .add('Default', () => (
    <Wrapper>
      <Divider />
    </Wrapper>
  ));
