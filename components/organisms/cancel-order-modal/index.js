// @flow
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import Modal from 'components/atoms/modal';
import TextArea from 'components/atoms/forms/text-area';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import { type StoreType } from 'lib/types/store';
import { STATUS_TYPES } from 'lib/common/constants';
import { CancelModalWrapper, ButtonRow, ErrorText } from './styles';

type Props = {
  store: StoreType,
  onClose: () => void,
  onSubmit: string => void,
};

class CancelOrderModal extends Component<Props> {
  @observable
  reason: string = '';

  @action
  onChange = (reason: string) => {
    this.reason = reason;
  };

  close = () => {
    const { onClose } = this.props;
    this.reason = '';
    onClose();
  };

  render() {
    const { store, onSubmit } = this.props;

    const { cancelOrderId, orderData } = store.buyerOrders;

    const { text, cancelable } = orderData
      ? STATUS_TYPES[orderData.status]
      : { text: '', cancelable: true };

    if (!cancelOrderId) return null;

    return (
      <Modal header="Cancel Order" store={store}>
        <CancelModalWrapper>
          <div>
            Canceling the order will remove the PO from your list, and notify
            the seller that the order has been canceled.
            <p>Please inform the seller why you are canceling the PO.</p>
          </div>

          <TextArea
            value={this.reason}
            onChange={e => this.onChange(e.target.value)}
            hasError={!cancelable}
            disabled={!cancelable}
            maxLength={255}
          />

          {cancelable ? (
            <p>Are you sure you want to cancel the PO?</p>
          ) : (
            <ErrorText>
              You may no longer cancel this order because the seller has marked
              the status as {text}.
            </ErrorText>
          )}

          {cancelable ? (
            <ButtonRow>
              <ButtonWhiteNoHover onClick={this.close}>
                No, Go Back
              </ButtonWhiteNoHover>
              <ButtonPrimary
                disabled={!this.reason.trim()}
                onClick={() => onSubmit(this.reason.trim())}
              >
                Yes, Cancel PO
              </ButtonPrimary>
            </ButtonRow>
          ) : (
            <ButtonRow>
              <ButtonPrimary onClick={this.close}>Ok</ButtonPrimary>
            </ButtonRow>
          )}
        </CancelModalWrapper>
      </Modal>
    );
  }
}

export default inject('store')(observer(CancelOrderModal));
