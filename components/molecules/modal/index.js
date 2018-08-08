// @flow
import { Component } from 'react';
import Modal from 'components/atoms/modal';
import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';
import ModalHeader from './modal-header';

const { charcoal, white } = theme.colors;

const ModalBody = styled.div`
  width: ${props => (props.width ? props.width : '400px')};
  height: auto;
  background-color: ${white};
  font-size: ${rem(13)};
  font-weight: 300;
  line-height: ${rem(20)};
  color: ${charcoal};
  border-radius: ${rem(3)};
`;

type Props = {
  modalHandle: string,
  title?: string,
  children: any,
  onCancel?: () => void,
  width?: string,
};

// Preferably, this would be named `Modal`, but that conflicts with the `Modal`
// atom referenced in this file. Also, I tried aliasing the `Modal` atom at the
// import but that breaks React contexts, which are used to pass stores to
// the atom `Modal`. Callers should reference this component as `Modal`, not
// `ModalWithHeader`.
export class ModalWithHeader extends Component<Props> {
  render() {
    const { modalHandle, title, children, onCancel } = this.props;
    const header = title ? <ModalHeader>{title}</ModalHeader> : null;

    return (
      <Modal modalHandle={modalHandle} onCancel={onCancel}>
        {header}
        <ModalBody width={this.props.width}>{children}</ModalBody>
      </Modal>
    );
  }
}

export default ModalWithHeader;
