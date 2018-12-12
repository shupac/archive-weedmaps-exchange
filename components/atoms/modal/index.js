// @flow
/* globals document window */
import * as React from 'react';
import { type StoreType } from 'lib/types/store';
import { inject, observer } from 'mobx-react';
import Transition from 'react-transition-group/Transition';
import { Icons } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import { MODAL_TRANSITION } from 'lib/common/constants';
import Portal from './portal';
import {
  CloseButton,
  ModalContainer,
  ModalHeader,
  ModalContent,
} from './styles';

type Props = {
  children: Node,
  store: StoreType,
  keyDownHandler?: (event: KeyboardEvent) => void,
  mouseDownHandler?: (event: MouseEvent) => void,
  header?: string,
};

class Modal extends React.Component<Props> {
  nodeRef: ?HTMLDivElement;

  lockBgScroll = (lock: boolean) => {
    if (lock) {
      // $FlowFixMe
      document.body.classList.add('modal-open');
    } else {
      // $FlowFixMe
      document.body.classList.remove('modal-open');
    }
  };

  onKeyDown = (event: KeyboardEvent) => {
    const { keyDownHandler, store } = this.props;
    const { closeModal } = store.uiStore;

    if (keyDownHandler) keyDownHandler(event);
    if (event.keyCode === 27) closeModal();
  };

  onMouseDown = (event: MouseEvent) => {
    const { mouseDownHandler, store } = this.props;
    const { closeModal } = store.uiStore;

    if (mouseDownHandler) mouseDownHandler(event);
    if (event.target === this.nodeRef) closeModal();
  };

  componentDidUpdate(prevProps: Props) {
    const { uiStore: newStore } = this.props.store;
    const { uiStore: oldStore } = prevProps.store;

    if (newStore.activeModal !== oldStore.activeModal) {
      this.lockBgScroll(!!newStore.activeModal);
    }
  }

  componentWillUnmount() {
    const { closeModal } = this.props.store.uiStore;
    this.lockBgScroll(false);
    closeModal();
  }

  setRef = (node: ?HTMLDivElement) => {
    this.nodeRef = node;
  };

  render() {
    const { store, header, children } = this.props;
    const { activeModal, closeModal } = store.uiStore;

    return (
      <Portal
        keyDownHandler={e => this.onKeyDown(e)}
        mouseDownHandler={e => this.onMouseDown(e)}
      >
        <Transition in={!!activeModal} timeout={MODAL_TRANSITION} appear>
          {status => (
            <div className={`modal-overlay ${status}`} ref={this.setRef}>
              {this.nodeRef && (
                <ModalContainer>
                  <CloseButton onClick={closeModal}>
                    <Icons.Close
                      theme={{
                        colors: { border: theme.colors.textInput },
                      }}
                    />
                  </CloseButton>

                  {header && <ModalHeader>{header}</ModalHeader>}

                  <ModalContent
                    style={{
                      maxHeight: this.nodeRef.clientHeight - 106,
                    }}
                  >
                    {children}
                  </ModalContent>
                </ModalContainer>
              )}
            </div>
          )}
        </Transition>
      </Portal>
    );
  }
}

export default inject('store')(observer(Modal));
export { Modal };
