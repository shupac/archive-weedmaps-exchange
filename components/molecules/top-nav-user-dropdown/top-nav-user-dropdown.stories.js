import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import GlobalStyleDecorator from 'storybook/decorators/global-style';
import backgroundColor from 'react-storybook-decorator-background';
import { UserDropdown } from './index';

const mockStore = {
  authStore: {
    user: {
      username: 'Skippy Skiperson',
      avatarUrl: 'http://i.pravatar.cc/120',
    },
  },
};

export default storiesOf('Top nav: User Dropdown')
  .addDecorator(GlobalStyleDecorator)
  .addDecorator(backgroundColor(['#F2F5F5', '#FFFFFF', '#000000']))
  .addDecorator(withKnobs)
  .add('User Dropdown', () => (
    <div>
      <UserDropdown store={mockStore} />
    </div>
  ));
