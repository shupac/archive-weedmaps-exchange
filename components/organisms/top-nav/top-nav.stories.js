// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GlobalStyleDecorator from 'storybook/decorators/global-style';
import backgroundColor from 'react-storybook-decorator-background';
import TopNav from './index';

export default storiesOf('Top Navigation', module)
  .addDecorator(GlobalStyleDecorator)
  .addDecorator(backgroundColor(['#F2F5F5', '#FFFFFF', '#000000']))
  .addDecorator(withKnobs)
  .add('selected', () => {
    const count = number('Mail count', 1);
    const userName = text('User name', 'gabOng');
    const menuSelections: string[] = [
      'dashboard',
      'deals',
      'permissions',
      'settings',
      'help',
    ];
    const activeLink = select(
      'Menu selection',
      menuSelections,
      menuSelections[0],
    );

    return (
      <div style={{ width: '900px' }}>
        <TopNav
          activeLink={activeLink}
          avatarUrl="http://i.pravatar.cc/120"
          onMenuClick={action('expand side menu toggle')}
          count={count}
          userName={userName}
        />
      </div>
    );
  });
