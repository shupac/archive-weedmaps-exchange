import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import styled from 'styled-components';
import React from 'react';
import StateComponent from 'react-component-component';
import { ButtonWhite } from 'components/atoms/button';
import Map from 'components/atoms/map';
import SlideInDrawer, { DrawerHead } from './';

const Wrapper = styled.div`
  width: 700px;
  height: 100%;
  margin: 0 auto;
`;

const FixedSize = styled(Map)`
  height: 334px;
  width: 100%;
`;

export default storiesOf('SlideDrawer', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Wrapper>
      <StateComponent initialState={{ open: true }}>
        {({ state, setState }) => (
          <SlideInDrawer
            show={boolean('Drawer Open?', state.open)}
            maxWidth="502px"
          >
            <DrawerHead onClick={() => setState({ open: !state.open })}>
              <ButtonWhite w={150}>ACTION BTN</ButtonWhite>
            </DrawerHead>
            <div style={{ padding: '24px' }}>
              <FixedSize center={[-111.023889, 32.1561235]} />
            </div>
          </SlideInDrawer>
        )}
      </StateComponent>
    </Wrapper>
  ));
