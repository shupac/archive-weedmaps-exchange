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
    const { keyDownHandler } = this.props;
    this.modalRoot = document.createElement('div');
    this.modalRoot.id = 'modal-node';
    if (document.body) document.body.appendChild(this.modalRoot);
    if (keyDownHandler)
      document.addEventListener('keydown', keyDownHandler, false);
  }

  componentWillUnmount() {
    const { keyDownHandler } = this.props;
    if (document.body) document.body.removeChild(this.modalRoot);
    if (keyDownHandler)
      document.removeEventListener('keydown', keyDownHandler, false);
  }

  render() {
    if (this.props.children)
      return ReactDOM.createPortal(this.props.children, this.modalRoot);
    return null;
  }
}

export default Portal;
