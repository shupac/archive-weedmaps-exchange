// @flow
import { Component, type Node } from 'react';
import { type StoreType } from 'lib/types/store';
import { inject, observer } from 'mobx-react';
import Modal from 'components/atoms/modal';
// $FlowFixMe
import Icons from '@ghostgroup/ui.icons';
import theme from 'lib/styles/theme';
import { ContentWrapper, PagingWrapper } from './styles';

const { Arrow } = Icons;

type Props = {
  children: Node,
  store: StoreType,
  hasPaging: boolean,
  onNextItem: () => void,
  onPrevItem: () => void,
};

export class PaginatedModalTemplate extends Component<Props> {
  static defaultProps = {
    hasPaging: true,
  };

  keyDownHandler = (event: KeyboardEvent) => {
    const { store, onNextItem, onPrevItem } = this.props;
    const { keyCode } = event;

    if (store.uiStore.activeModal) {
      switch (keyCode) {
        case 37:
          onPrevItem();
          break;
        case 39:
          onNextItem();
          break;
        default:
      }
    }
  };

  render() {
    const { store, onNextItem, onPrevItem, hasPaging, children } = this.props;

    return (
      <Modal keyDownHandler={this.keyDownHandler} store={store}>
        <ContentWrapper>
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
        </ContentWrapper>
      </Modal>
    );
  }
}

const PaginatedModal = inject('store')(observer(PaginatedModalTemplate));
export default PaginatedModal;
