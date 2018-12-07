// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import ContextMenu, { MenuItem } from './';

export default storiesOf('ContextMenu', module)
  .addDecorator(centered)
  .add('Default', () => (
    <ContextMenu>
      <MenuItem
        onClick={() => {
          console.log('Cancel');
        }}
      >
        Cancel
      </MenuItem>
      <MenuItem
        onClick={() => {
          console.log('Return');
        }}
      >
        Return
      </MenuItem>
    </ContextMenu>
  ));
