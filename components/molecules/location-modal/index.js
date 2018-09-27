// @flow
import React, { Fragment } from 'react';
import { ButtonPrimary } from 'components/atoms/button';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import ModalWithHeader from 'components/molecules/modal-with-header';

type Props = {
  store: StoreType,
};

export const AddLocationModal = ({ store }: Props) => (
  <Fragment>
    <ButtonPrimary
      width={154}
      fontSize={14}
      onClick={() => store.uiStore.onOpenModal()}
    >
      ADD LOCATION
    </ButtonPrimary>
    <ModalWithHeader header="Add Location" />
  </Fragment>
);

const LocationModal = inject('store')(observer(AddLocationModal));
export default LocationModal;
