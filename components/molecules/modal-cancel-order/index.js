// @flow
import { Component } from 'react';
import { type Store } from 'lib/types/stores';
import { inject, observer } from 'mobx-react';
import ModalWithHeader from 'components/molecules/modal-with-header';
import TextArea from 'components/atoms/forms/text-area';
import { ButtonPrimary, ButtonWhite } from 'components/atoms/button';
import { ModalBody, ButtonRow } from './styles';

type Props = {
  children: Node,
  store: Store,
  onConfirm: (text: string) => void,
  title: string,
};

type State = {
  description: string,
};

export class CancelOrderModalTemplate extends Component<Props, State> {
  state = {
    description: '',
  };

  resetState = () => this.setState({ description: '' });

  keyDownHandler = (event: KeyboardEvent) => {
    const { uiStore } = this.props.store;
    const { keyCode } = event;

    if (uiStore.modalIsOpen && keyCode === 27) {
      return this.resetState();
    }

    return null;
  };

  onCancelPress = () => {
    const { uiStore } = this.props.store;
    this.resetState();
    return uiStore.onCloseModal();
  };

  onConfirmPress = () => {
    const { description } = this.state;
    const { onConfirm } = this.props;
    onConfirm(description);
    return this.resetState();
  };

  handleChange = (description: string) => this.setState({ description });

  render() {
    const { children, store, title } = this.props;
    const { description } = this.state;

    return (
      <ModalWithHeader
        width="620px"
        header={title}
        keyDownHandler={this.keyDownHandler}
        mouseDownHandler={this.resetState}
        store={store}
      >
        {children}
        <ModalBody>
          <p>
            Cancelling the order will remove the PO from your list, and notify
            the seller that the order has been cancelled.
          </p>
          <p>Please inform the seller why you are cancelling the PO.</p>
          <TextArea
            value={description}
            onChange={e => this.handleChange(e.target.value)}
          />
          <p>Are you sure you want to cancel the PO?</p>
          <ButtonRow>
            <div />
            <ButtonWhite
              style={{ width: '155px' }}
              onClick={this.onCancelPress}
            >
              No, Go Back
            </ButtonWhite>
            <ButtonPrimary
              disabled={!description.trim()}
              style={{ width: '166px' }}
              onClick={this.onConfirmPress}
            >
              Yes, Cancel PO
            </ButtonPrimary>
          </ButtonRow>
        </ModalBody>
      </ModalWithHeader>
    );
  }
}

const CancelOrderModal = inject('store')(observer(CancelOrderModalTemplate));
export default CancelOrderModal;
