// @flow
import { Component, type Node } from 'react';
import { isServer } from 'lib/common/universal-helpers';
import { type StoreType } from 'lib/types/store';
import { inject, observer } from 'mobx-react';
import Modal from 'components/atoms/modal';
import { Icons } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import PagingWrapper from './styles';

const { Arrow } = Icons;

type Props = {
  children: Node,
  store: StoreType,
  hasPaging: boolean,
  onNextItem: () => void,
  onPrevItem: () => void,
};

const valueOfIsServer = isServer();

export class PaginatedModalTemplate extends Component<Props> {
  static defaultProps = {
    hasPaging: true,
  };

  keyDownHandler = (event: KeyboardEvent) => {
    const { store, onNextItem, onPrevItem } = this.props;
    const { keyCode } = event;

    if (store.uiStore.modalIsOpen) {
      switch (keyCode) {
        case 37:
          return onPrevItem();
        case 39:
          return onNextItem();
        default:
          return null;
      }
    }

    return null;
  };

  render() {
    const { store, onNextItem, onPrevItem, hasPaging, children } = this.props;

    if (valueOfIsServer) return null;

    return (
      <Modal keyDownHandler={this.keyDownHandler} store={store}>
        {children}
        {hasPaging && (
          <PagingWrapper>
            <div onClick={onNextItem}>
              <Arrow
                className="rightArrow"
                size="24px"
                rotate="270deg"
                fill={theme.colors.white}
              />
            </div>
            <div onClick={onPrevItem}>
              <Arrow
                className="leftArrow"
                size="24px"
                rotate="90deg"
                fill={theme.colors.white}
              />
            </div>
          </PagingWrapper>
        )}
      </Modal>
    );
  }
}

const PaginatedModal = inject('store')(observer(PaginatedModalTemplate));
export default PaginatedModal;
