// @flow
/* globals document window */
import { Component } from 'react';
import { isServer } from 'lib/common/universal-helpers';
import { type Store } from 'lib/types/stores';
import { inject, observer } from 'mobx-react';
import Transition from 'react-transition-group/Transition';
import { Icons } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import { CloseButton, ModalContainer } from './styled-components';
import Portal from './portal';

const valueOfIsServer = isServer();

type Props = {
  children: React.Node,
  store: Store,
  keyDownHandler: (event: KeyboardEvent) => void,
};
export class ModalTemplate extends Component<Props> {
  lockBgScroll = (lock: boolean) => {
    if (!isServer() && document.body && document.body.classList) {
      if (lock) {
        // $FlowFixMe
        document.body.classList.add('modal-open');
      } else {
        // $FlowFixMe
        document.body.classList.remove('modal-open');
      }
    }
  };

  onKeyDown = (event: KeyboardEvent) => {
    const { keyDownHandler, store } = this.props;
    const { onCloseModal } = store.uiStore;
    return event.keyCode === 27 ? onCloseModal() : keyDownHandler(event);
  };

  componentDidUpdate(prevProps: Props) {
    const { uiStore: newStore } = this.props.store;
    const { uiStore: oldStore } = prevProps.store;
    if (newStore.modalIsOpen !== oldStore.modalIsOpen) {
      this.lockBgScroll(newStore.modalIsOpen);
    }
  }

  componentWillUnmount() {
    const { onCloseModal } = this.props.store.uiStore;
    this.lockBgScroll(false);
    onCloseModal();
  }

  render() {
    const { children, store } = this.props;
    const { uiStore } = store;
    const { modalIsOpen, onCloseModal } = uiStore;
    if (valueOfIsServer) return null;
    return (
      <Portal keyDownHandler={e => this.onKeyDown(e)}>
        <Transition in={modalIsOpen} timeout={300} appear>
          {status => (
            <div className={`modal-overlay ${status}`}>
              <ModalContainer>
                <CloseButton onClick={onCloseModal}>
                  <Icons.Close
                    theme={{
                      colors: { border: theme.colors.textInput },
                    }}
                  />
                </CloseButton>
                {children}
              </ModalContainer>
            </div>
          )}
        </Transition>
      </Portal>
    );
  }
}

const Modal = inject('store')(observer(ModalTemplate));
export default Modal;
