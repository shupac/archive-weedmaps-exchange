// @flow
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'components/atoms/modal';
import { ModalContentWrapper, ButtonRow } from 'components/atoms/modal/styles';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import { type StoreType } from 'lib/types/store';

type Props = {
  store: StoreType,
  productCount: number,
  variantCount: number,
};

export class DeleteZoneModal extends Component<Props> {
  onSubmit = async () => {
    const { uiStore } = this.props.store;

    uiStore.closeModal();
  };

  render() {
    const { store, productCount, variantCount } = this.props;
    const { openModal } = store.uiStore;

    return (
      <Modal header="Delete Zone" store={store}>
        <ModalContentWrapper>
          <p>
            There are currently {productCount} products with {variantCount}{' '}
            variants allocated to this zone. If you delete this zone, those
            products will no longer be associated to a zone.{' '}
          </p>
          <p>Are you sure you want to delete this zone?</p>

          <ButtonRow>
            <ButtonWhiteNoHover
              data-test-id="cancel-button"
              onClick={() => openModal('')}
            >
              Cancel
            </ButtonWhiteNoHover>
            <ButtonPrimary data-test-id="delete-button" onClick={this.onSubmit}>
              Delete Zone
            </ButtonPrimary>
          </ButtonRow>
        </ModalContentWrapper>
      </Modal>
    );
  }
}

export default inject('store')(observer(DeleteZoneModal));
