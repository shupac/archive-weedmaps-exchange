import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import centered from '@storybook/addon-centered';
import zones from 'lib/mocks/zones';
import ZoneCard from './';

const Wrapper = styled.div`
  width: 384px;
`;

export default storiesOf('ZoneCard', module)
  .addDecorator(centered)
  .add('With Menu', () => (
    <Wrapper>
      {zones.map(item => (
        <ZoneCard zone={item} withMenu />
      ))}
    </Wrapper>
  ))
  .add('Without Menu', () => (
    <Wrapper>
      {zones.map(item => (
        <ZoneCard zone={item} />
      ))}
    </Wrapper>
  ));
