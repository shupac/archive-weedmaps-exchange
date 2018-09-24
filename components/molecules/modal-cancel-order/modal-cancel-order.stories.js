import { Component, type Node } from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'mobx-react';
import centered from '@storybook/addon-centered';
import { ButtonPrimary } from 'components/atoms/button';
import CancelOrderModal from './';

type Props = {
  children?: Node,
};
class ModalWrapper extends Component<Props> {
  state = {
    isOpen: false,
  };

  onOpenModal = () => this.setState({ isOpen: true });

  onCloseModal = () => this.setState({ isOpen: false });

  onSave = text => {
    console.log('Submission Text', text);
    this.onCloseModal();
  };

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <ButtonPrimary onClick={this.onOpenModal}>Cancel Order</ButtonPrimary>
        <CancelOrderModal
          title="Cancel Order"
          onConfirm={this.onSave}
          store={{
            uiStore: {
              modalIsOpen: isOpen,
              onCloseModal: this.onCloseModal,
            },
          }}
        >
          {children}
        </CancelOrderModal>
      </div>
    );
  }
}

export default storiesOf('Modal: Cancel Order', module)
  .addDecorator(centered)
  .add('Basic', () => (
    <Provider>
      <ModalWrapper />
    </Provider>
  ));
