// @flow
import React, { type Node } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'components/atoms/modal';
import { type StoreType } from 'lib/types/store';
import { ModalHeader, ModalBody } from './styles';

type Props = {
  store: StoreType,
  children: Node,
  header?: string,
  width?: string,
  height?: string,
  keyDownHandler?: () => void,
  mouseDownHandler?: () => void,
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
  height,
  keyDownHandler,
  mouseDownHandler,
}: Props) => (
  <Modal
    keyDownHandler={keyDownHandler}
    mouseDownHandler={mouseDownHandler}
    store={store}
  >
    {header && <ModalHeader height={height}>{header}</ModalHeader>}
    <ModalBody width={width}>{children}</ModalBody>
  </Modal>
);

const ModalWithHeader = inject('store')(observer(ModalWithHeaderTemplate));
export default ModalWithHeader;
