import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'mobx-react';
import centered from '@storybook/addon-centered';
import noop from 'lib/common/noop';
import ModalWithHeader from './';

export default storiesOf('ModalWithHeader', module)
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
      <ModalWithHeader title="Modal Header">
        <h1>Modal Body</h1>
      </ModalWithHeader>
    </Provider>
  ));
