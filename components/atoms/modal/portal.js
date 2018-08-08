// @flow
/* globals document window */
import * as React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: React.Node,
  keyDownHandler?: () => void,
};
class Portal extends React.Component<Props> {
  modalRoot: HTMLDivElement;

  componentWillMount() {
    this.modalRoot = document.createElement('div');
    this.modalRoot.id = 'modal-node';
    if (document.body) document.body.appendChild(this.modalRoot);
    if (this.props.keyDownHandler)
      document.addEventListener('keydown', this.props.keyDownHandler);
  }

  componentWillUnmount() {
    if (document.body) document.body.removeChild(this.modalRoot);
    if (this.props.keyDownHandler)
      document.removeEventListener('keydown', this.props.keyDownHandler);
  }

  render() {
    if (this.props.children)
      return ReactDOM.createPortal(this.props.children, this.modalRoot);
    return null;
  }
}

export default Portal;
