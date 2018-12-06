// @flow
import { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import Modal from 'components/atoms/modal';
import TextArea from 'components/atoms/forms/text-area';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import { type StoreType } from 'lib/types/store';
import { CancelModalWrapper, ButtonRow, ErrorText } from './styles';

type Props = {
  status: string,
  cancelable: boolean,
  onSubmit: (reason: string) => void,
  onClose: () => void,
  store: StoreType,
};

type State = {
  reason: string,
};

class CancelOrderModal extends Component<Props, State> {
  @observable
  reason: string = '';

  @action
  onChange = (reason: string) => {
    this.reason = reason;
  };

  render() {
    const { status, cancelable, onClose, onSubmit, store } = this.props;

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
              the status as {status}.
            </ErrorText>
          )}

          {cancelable ? (
            <ButtonRow>
              <ButtonWhiteNoHover onClick={onClose}>
                No, Go Back
              </ButtonWhiteNoHover>
              <ButtonPrimary
                disabled={!this.reason.trim()}
                onClick={() => onSubmit(this.reason)}
              >
                Yes, Cancel PO
              </ButtonPrimary>
            </ButtonRow>
          ) : (
            <ButtonRow>
              <ButtonPrimary onClick={onClose}>Ok</ButtonPrimary>
            </ButtonRow>
          )}
        </CancelModalWrapper>
      </Modal>
    );
  }
}

export default observer(CancelOrderModal);
