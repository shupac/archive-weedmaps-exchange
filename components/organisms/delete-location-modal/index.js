// @flow
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'components/atoms/modal';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import { type StoreType } from 'lib/types/store';
import { ModalContentWrapper, ButtonRow } from './styles';

type Props = {
  store: StoreType,
};

export class DeleteLocationModal extends Component<Props> {
  onSubmit = async () => {
    const { buyerSettings, uiStore } = this.props.store;
    const { deleteLocation, locationToDelete } = buyerSettings;
    const { id } = locationToDelete;
    const success = await deleteLocation(id);
    if (success) uiStore.closeModal();
  };

  render() {
    const { store } = this.props;
    const { locationToDelete } = store.buyerSettings;
    const { openModal } = store.uiStore;

    return (
      <Modal header="Delete Location" store={store}>
        <ModalContentWrapper>
          <p>Are you sure you want to delete {locationToDelete.name}?</p>
          <p>
            Note: Deleting this address will not delete any pending orders being
            shipped to this address.
          </p>

          <ButtonRow>
            <ButtonWhiteNoHover
              data-test-id="cancel-button"
              onClick={() => openModal('')}
            >
              Cancel
            </ButtonWhiteNoHover>
            <ButtonPrimary data-test-id="delete-button" onClick={this.onSubmit}>
              Delete
            </ButtonPrimary>
          </ButtonRow>
        </ModalContentWrapper>
      </Modal>
    );
  }
}

export default inject('store')(observer(DeleteLocationModal));
