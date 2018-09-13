// @flow
import React, { Component, type Node } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import centered from '@storybook/addon-centered';
import Modal from './';

const MockModal = styled.div`
  width: 400px;
  height: 400px;
  background-color: #fff;
`;

type Props = {
  children?: ?Node,
  modalIsOpen?: boolean,
};

type State = {
  modalIsOpen?: boolean,
  children?: ?Node,
};

class ModalWrapper extends Component<State, Props> {
  state = {
    modalIsOpen: false,
  };

  onClosePress = () => this.setState({ modalIsOpen: false });

  onOpenPress = () => this.setState({ modalIsOpen: true });

  render() {
    const { children } = this.props;
    return (
      <div>
        <button onClick={() => this.onOpenPress()}>
          <span>Open Modal</span>
        </button>
        <Modal
          store={{
            uiStore: {
              modalIsOpen: this.state.modalIsOpen,
              onCloseModal: this.onClosePress,
              onOpenModal: this.onOpenPress,
            },
          }}
          keyDownHandler={null}
        >
          {children}
        </Modal>
      </div>
    );
  }
}

export default storiesOf('Modal', module)
  .addDecorator(centered)
  .add('Default', () => (
    <ModalWrapper>
      <MockModal />
    </ModalWrapper>
  ));
