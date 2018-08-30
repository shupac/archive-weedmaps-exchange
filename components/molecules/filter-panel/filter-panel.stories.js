import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from '../../../.storybook/decorators/global-style';

import FilterPanel from './';

class Parent extends React.Component {
  render() {
    return <FilterPanel />;
  }
}

export default storiesOf('FilterPanel', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <Parent />);
