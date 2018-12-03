// @flow
/* globals document window */
import React, { type Node } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: Node,
  keyDownHandler?: (event: KeyboardEvent) => void,
  mouseDownHandler?: (event: MouseEvent) => void,
};
class Portal extends React.Component<Props> {
  modalRoot: HTMLDivElement;

  componentWillMount() {
    const { keyDownHandler, mouseDownHandler } = this.props;
    this.modalRoot = document.createElement('div');
    this.modalRoot.id = 'modal-node';
    if (document.body) document.body.appendChild(this.modalRoot);
    if (keyDownHandler)
      document.addEventListener('keydown', keyDownHandler, false);
    if (mouseDownHandler)
      document.addEventListener('mousedown', mouseDownHandler, false);
  }

  componentWillUnmount() {
    const { keyDownHandler, mouseDownHandler } = this.props;
    if (document.body) document.body.removeChild(this.modalRoot);
    if (keyDownHandler)
      document.removeEventListener('keydown', keyDownHandler, false);
    if (mouseDownHandler)
      document.removeEventListener('mousedown', mouseDownHandler, false);
  }

  render() {
    if (this.props.children) {
      return ReactDOM.createPortal(this.props.children, this.modalRoot);
    }
    return null;
  }
}

export default Portal;
