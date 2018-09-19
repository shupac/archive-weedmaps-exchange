import { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'mobx-react';
import styled from 'styled-components';
import centered from '@storybook/addon-centered';
import { rem } from 'polished';
import { ButtonPrimary } from 'components/atoms/button';
import ModalWithHeader from './';
import SellerDetailModal, { type Seller } from './seller-detail-modal';

const MockModal = styled.div`
  width: 400px;
  height: 400px;
  background-color: $fff;
`;

const MockModalBody = styled.div`
  padding: ${rem(4)} ${rem(16)} ${rem(16)};
`;

type Props = {
  children?: Node,
  header?: any,
  seller: Seller,
};

class ModalWrapper extends Component<Props> {
  state = {
    isOpen: false,
  };

  onClosePress = () => this.setState({ isOpen: false });

  onOpenPress = () => this.setState({ isOpen: true });

  keyDownHandler = event => (event.keyCode === 27 ? this.onClosePress() : null);

  render() {
    const { children, header, seller } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <button onClick={() => this.onOpenPress()}>
          <span>Open Modal</span>
        </button>
        {seller ? (
          <SellerDetailModal
            seller={seller}
            store={{
              uiStore: {
                modalIsOpen: isOpen,
                onCloseModal: this.onClosePress,
              },
            }}
            header={header}
          >
            {children}
          </SellerDetailModal>
        ) : (
          <ModalWithHeader
            keyDownHandler={e => this.keyDownHandler(e)}
            store={{
              uiStore: {
                modalIsOpen: isOpen,
                onCloseModal: this.onClosePress,
              },
            }}
            header={header}
          >
            {children}
          </ModalWithHeader>
        )}
      </div>
    );
  }
}

export default storiesOf('Modal: Header', module)
  .addDecorator(centered)
  .add('Basic', () => (
    <Provider>
      <ModalWrapper header="Hello, My Name Is Slim Shady">
        <MockModal />
      </ModalWrapper>
    </Provider>
  ))
  .add('Error', () => (
    <Provider>
      <ModalWrapper header="Warning!" width="400px">
        <MockModalBody>
          <p>
            There are deals scheduled on the day(s) you have selected. To
            continue scheduling this deal, please choose a different day or
            delete the conflicting deal(s) below.
          </p>
          <p>
            <b>- Buy One Get One Free Catridges! on Wed, Oct 25, 2018</b>
          </p>
          <ButtonPrimary style={{ width: '200px', margin: '0 auto' }}>
            OK
          </ButtonPrimary>
        </MockModalBody>
      </ModalWrapper>
    </Provider>
  ))
  .add('Seller Detail Modal', () => (
    <ModalWrapper
      seller={{
        name: 'STIIZY',
        phone: '(555)-555-5555',
        email: 'weedmaps@weedmaps.com',
        licenses: [
          {
            number: 'ABC-123-420-YAY',
            type: 'Medical Retailer',
          },
          {
            number: 'DEF-456-024-AYA',
            type: 'Recreational Grower',
          },
        ],
      }}
    />
  ));
