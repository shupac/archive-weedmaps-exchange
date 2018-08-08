import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'mobx-react';
import centered from '@storybook/addon-centered';
import styled from 'styled-components';
import { rem } from 'polished';
import noop from 'lib/common/noop';
import { ButtonPrimary } from 'components/atoms/button';
import ModalWithHeader from './';

const ModalBody = styled.div`
  padding: ${rem(4)} ${rem(16)} ${rem(16)};
`;

export default storiesOf('ErrorModal', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Provider
      modal={{
        modalIsShown: true,
        toggleModal: noop,
        closeModal: noop,
        showModalMap: { get: () => true },
      }}
    >
      <ModalWithHeader title="Warning!" width="400px">
        <ModalBody>
          <p>
            There are deals scheduled on the day(s) you have selected. To
            continue scheduling this deal, please choose a different day or
            delete the conflicting deal(s) below.
          </p>
          <p>
            <b>- Buy One Get One Free Catridges! on Wed, Oct 25, 2017</b>
          </p>
          <ButtonPrimary style={{ width: '200px', margin: '0 auto' }}>
            OK
          </ButtonPrimary>
        </ModalBody>
      </ModalWithHeader>
    </Provider>
  ));
