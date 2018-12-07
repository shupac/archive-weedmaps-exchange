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
};

class CancelOrderModal extends Component<Props> {
  @observable
  reason: string = '';

  @action
  onChange = (reason: string) => {
    this.reason = reason;
  };

  onClose = () => {
    this.props.store.buyerOrders.cancelOrder(null);
  };

  onSubmit = async (reason: string) => {
    const { cancelOrderId, updateOrderStatus } = this.props.store.buyerOrders;

    updateOrderStatus(cancelOrderId, 'canceled', reason);
  };

  render() {
    const { store } = this.props;
    const { cancelOrderId, orderData } = store.buyerOrders;

    if (!cancelOrderId) return null;

    const { text, cancelable } = orderData
      ? STATUS_TYPES[orderData.status]
      : { text: '', cancelable: true };

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
              <ButtonWhiteNoHover onClick={this.onClose}>
                No, Go Back
              </ButtonWhiteNoHover>
              <ButtonPrimary
                disabled={!this.reason.trim()}
                onClick={() => this.onSubmit(this.reason)}
              >
                Yes, Cancel PO
              </ButtonPrimary>
            </ButtonRow>
          ) : (
            <ButtonRow>
              <ButtonPrimary onClick={this.onClose}>Ok</ButtonPrimary>
            </ButtonRow>
          )}
        </CancelModalWrapper>
      </Modal>
    );
  }
}

export default inject('store')(observer(CancelOrderModal));
