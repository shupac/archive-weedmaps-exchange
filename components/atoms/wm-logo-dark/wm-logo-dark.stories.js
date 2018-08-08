import React from 'react';
import { storiesOf } from '@storybook/react';
import storybookBackgrounds from 'lib/common/storybook-backgrounds';
import styled from 'styled-components';

import WmLogoDark from './';

const Wrapper = styled.div`
  width: 200px;
  margin: auto;
`;

export default storiesOf('WmLogoDark', module)
  .addDecorator(storybookBackgrounds())
  .add('Default', () => (
    <Wrapper>
      <WmLogoDark />
    </Wrapper>
  ));
