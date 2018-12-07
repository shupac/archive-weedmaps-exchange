// @flow
import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Dots } from 'components/atoms/icons';
import { ContextMenuWrapper, Menu, MenuItem } from './styles';

type Props = {
  children?: React.Node,
};

class ContextMenu extends React.Component<Props> {
  @observable
  isOpen = false;

  modalRoot: HTMLDivElement;

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    document.removeEventListener('click', this.handleClick, false);
  }

  @action
  openMenu = () => {
    this.isOpen = true;
    // eslint-disable-next-line no-undef
    document.addEventListener('click', this.handleClick, false);
  };

  @action
  closeMenu = () => {
    this.isOpen = false;
    // eslint-disable-next-line no-undef
    document.removeEventListener('click', this.handleClick, false);
  };

  handleClick = () => {
    this.closeMenu();
  };

  render() {
    const { children } = this.props;

    return (
      <ContextMenuWrapper>
        <Dots onClick={this.openMenu} />

        {this.isOpen && <Menu>{children}</Menu>}
      </ContextMenuWrapper>
    );
  }
}

export default observer(ContextMenu);
export { MenuItem };
