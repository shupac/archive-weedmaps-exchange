// @flow
import React, { Component } from 'react';
import { isServer } from 'lib/common/universal-helpers';
import Modal from 'components/atoms/modal';
import { inject, observer } from 'mobx-react';
import ConfirmModalCard from './confirm-modal-card';

type Props = {
  modal: any,
  modalHandle: string,
  title: string,
  children: any,
  onConfirm: () => Promise<any>,
};

export class ConfirmModal extends Component<Props> {
  onConfirm = () => {
    this.props.onConfirm();
  };

  onCancel = () => {
    this.props.modal.closeModal(this.props.modalHandle);
  };

  render() {
    const { children, title } = this.props;

    if (!isServer()) {
      return (
        <Modal modalHandle={this.props.modalHandle}>
          <ConfirmModalCard
            title={title}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
          >
            {children}
          </ConfirmModalCard>
        </Modal>
      );
    }
    return null;
  }
}

const ConnectedConfirmModal = inject('modal')(observer(ConfirmModal));
export default ConnectedConfirmModal;
