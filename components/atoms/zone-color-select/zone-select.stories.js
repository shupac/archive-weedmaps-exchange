import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import centered from '@storybook/addon-centered';
import ColorSelect from './';

const Wrapper = styled.div`
  width: 336px;
`;

export default storiesOf('ColorSelect', module)
  .addDecorator(centered)
  .add('With Menu', () => (
    <Wrapper>
      <ColorSelect onColorSelect={action('Color selected')} />
    </Wrapper>
  ));
