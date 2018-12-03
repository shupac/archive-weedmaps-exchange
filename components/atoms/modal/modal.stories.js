// @flow
import React, { type Node } from 'react';
import { storiesOf } from '@storybook/react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import centered from '@storybook/addon-centered';
import UiStore from 'lib/data-access/stores/ui';
import Modal from './';

const MockModal = styled.div`
  width: 400px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

type Props = {
  children?: ?Node,
  header?: string,
};

const uiStore = UiStore.create();

const ModalWrapper = observer((props: Props) => (
  <div>
    <button onClick={() => uiStore.openModal('testModal')}>
      <span>Open Modal</span>
    </button>

    {uiStore.activeModal === 'testModal' && (
      <Modal store={{ uiStore }} keyDownHandler={null} header={props.header}>
        {props.children}
      </Modal>
    )}
  </div>
));

export default storiesOf('Modal', module)
  .addDecorator(centered)
  .add('Default', () => (
    <ModalWrapper>
      <MockModal>Test Modal</MockModal>
    </ModalWrapper>
  ))
  .add('Header', () => (
    <ModalWrapper header="Modal Header">
      <MockModal>Test Modal</MockModal>
    </ModalWrapper>
  ))
  .add('Scrolling', () => (
    <ModalWrapper header="Modal Header">
      <MockModal>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} style={{ height: 200 }}>
            {i}
          </div>
        ))}
      </MockModal>
    </ModalWrapper>
  ));
