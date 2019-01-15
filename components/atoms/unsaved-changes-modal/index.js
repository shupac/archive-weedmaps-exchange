// @flow
import React from 'react';
import Modal from 'components/atoms/modal';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import { UnsavedChanges, Buttons } from './styles';

type Props = {
  onStay: () => void,
  onLeave: () => void,
};

const UnsavedChangesModal = (props: Props) => {
  const { onStay, onLeave } = props;

  return (
    <Modal header="Unsaved Changes">
      <UnsavedChanges>
        <div>
          There are currently unsaved changes on this page. If you leave this
          page, all unsaved changes will be lost. To save your changes, stay on
          this page and press the Save button.
        </div>
        <div>Are you sure you want to leave this page?</div>
        <Buttons>
          <ButtonWhiteNoHover onClick={onStay}>Stay on page</ButtonWhiteNoHover>
          <ButtonPrimary onClick={onLeave}>Leave page</ButtonPrimary>
        </Buttons>
      </UnsavedChanges>
    </Modal>
  );
};

UnsavedChangesModal.displayName = 'UnsavedChangesModal';

export default UnsavedChangesModal;
