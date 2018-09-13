// @flow
import React, { type Node } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'components/atoms/modal';
import { type Store } from 'lib/types/stores';
import { ModalHeader, ModalBody } from './styles';

type Props = {
  store: Store,
  children: Node,
  header?: string,
  width?: string,
  keyDownHandler?: () => void,
};

// Preferably, this would be named `Modal`, but that conflicts with the `Modal`
// atom referenced in this file. Also, I tried aliasing the `Modal` atom at the
// import but that breaks React contexts, which are used to pass stores to
// the atom `Modal`. Callers should reference this component as `Modal`, not
// `ModalWithHeader`.

export const ModalWithHeaderTemplate = ({
  store,
  children,
  header,
  width,
  keyDownHandler,
}: Props) => (
  <Modal keyDownHandler={keyDownHandler} store={store}>
    {header ? <ModalHeader>{header}</ModalHeader> : null}
    <ModalBody width={width}>{children}</ModalBody>
  </Modal>
);

const ModalWithHeader = inject('store')(observer(ModalWithHeaderTemplate));
export default ModalWithHeader;
