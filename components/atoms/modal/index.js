// @flow
/* globals document window */
import { Component } from 'react';
import { isServer } from 'lib/common/universal-helpers';
import { type StoreType } from 'lib/types/store';
import { inject, observer } from 'mobx-react';
import Transition from 'react-transition-group/Transition';
import { Icons } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import { CloseButton, ModalContainer } from './styled-components';
import Portal from './portal';

const valueOfIsServer = isServer();

type Props = {
  children: Node,
  store: StoreType,
  keyDownHandler?: (event: KeyboardEvent) => void,
  mouseDownHandler?: () => void,
};
export class ModalTemplate extends Component<Props> {
  nodeRef: Node;

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

    if (keyDownHandler) {
      if (event.keyCode === 27) {
        keyDownHandler(event);
        return onCloseModal();
      }
      return keyDownHandler(event);
    }
    if (event.keyCode === 27) {
      return onCloseModal();
    }
    return null;
  };

  onMouseDown = (event: MouseEvent) => {
    const { mouseDownHandler } = this.props;
    const { uiStore } = this.props.store;
    if (this.nodeRef === event.target) {
      if (mouseDownHandler) {
        mouseDownHandler();
      }
      return uiStore.onCloseModal();
    }
    return null;
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

  setRef = (node: Node) => {
    this.nodeRef = node;
  };

  render() {
    const { children, store } = this.props;
    const { uiStore } = store;
    const { modalIsOpen, onCloseModal } = uiStore;
    if (valueOfIsServer) return null;
    return (
      <Portal
        keyDownHandler={e => this.onKeyDown(e)}
        mouseDownHandler={e => this.onMouseDown(e)}
      >
        <Transition in={modalIsOpen} timeout={300} appear>
          {status => (
            <div className={`modal-overlay ${status}`} ref={this.setRef}>
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
