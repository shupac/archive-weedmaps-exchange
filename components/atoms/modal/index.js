// @flow
/* globals document window */
import { Component } from 'react';
import { isServer } from 'lib/common/universal-helpers';
import { inject, observer } from 'mobx-react';
import Transition from 'react-transition-group/Transition';
import { Icons } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import ModalStore from 'lib/stores/modal';
import { CloseButton, ModalContainer } from './styled-components';
import Portal from './portal';

const valueOfIsServer = isServer();

type Props = {
  children: React.Node,
  modal: ModalStore,
  showOnMount: boolean,
  modalHandle: string,
  onCancel?: () => void,
};

export class Modal extends Component<Props> {
  static defaultProps = {
    showOnMount: false,
  };

  componentDidMount() {
    const { showOnMount, modal: modalStore, modalHandle } = this.props;
    if (showOnMount && modalHandle) {
      modalStore.toggleModal(modalHandle);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { modal: modalStore, modalHandle } = this.props;
    const { modal: oldModalStore } = prevProps;

    const modalIsShown = modalStore.showModalMap.get(modalHandle);
    const oldModalIsShown = oldModalStore.showModalMap.get(modalHandle);
    if (oldModalIsShown !== modalIsShown) {
      this.lockBackgroundScroll(modalIsShown);
    }
  }

  closeModal = () => {
    const { modal: modalStore, modalHandle } = this.props;

    modalStore.closeModal(modalHandle);
  };

  // Ensure that modal state is set to off before unmounting
  componentWillUnmount() {
    this.closeModal();
  }

  lockBackgroundScroll(locked: boolean) {
    if (!isServer()) {
      if (locked) {
        // $FlowFixMe
        document.body.classList.add('modal-open');
      } else {
        // $FlowFixMe
        document.body.classList.remove('modal-open');
      }
    }
  }

  portalContent() {
    const { onCancel, modal: modalStore, children, modalHandle } = this.props;
    const isOpen = modalStore.showModalMap.get(modalHandle);

    if (!isOpen) return null;

    return (
      <Transition in timeout={300} appear>
        {status => (
          <div className={`modal-overlay ${status}`}>
            <ModalContainer>
              <CloseButton onClick={onCancel || this.closeModal}>
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
    );
  }

  render() {
    if (valueOfIsServer) return null;

    return <Portal>{this.portalContent()}</Portal>;
  }
}

const InjectedModal = inject('modal')(observer(Modal));

export default InjectedModal;
