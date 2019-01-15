import React from 'react';
import { Provider } from 'mobx-react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import UiStore from 'lib/data-access/stores/ui';
import UnsavedChangesModal from './';

const uiStore = UiStore.create({
  activeModal: 'unsavedChanges',
});

const actions = {
  onStay: () => {},
  onLeave: () => {},
};

export default storiesOf('UnsavedChangesModal', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Provider store={{ uiStore }}>
      <UnsavedChangesModal {...actions} />
    </Provider>
  ));
