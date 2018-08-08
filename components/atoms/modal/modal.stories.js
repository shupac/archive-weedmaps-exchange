import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import centered from '@storybook/addon-centered';
import noop from 'lib/common/noop';
import Modal from './';

const MockModal = styled.div`
  width: 400px;
  height: 400px;
  background-color: #fff;
`;

export default storiesOf('Modal', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Modal
      modal={{
        modalIsShown: true,
        toggleModal: noop,
        closeModal: noop,
        showModalMap: { get: () => true },
      }}
    >
      <MockModal />
    </Modal>
  ));
