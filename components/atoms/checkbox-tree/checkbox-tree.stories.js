import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from '../../../.storybook/decorators/global-style';

import CheckboxTree from './';
import data from './mock-data';

class Parent extends React.Component {
  state = data;

  render() {
    return (
      <CheckboxTree
        state={this.state}
        onChange={nextState => this.setState({ ...nextState })}
      />
    );
  }
}

export default storiesOf('CheckboxTree', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <Parent />);
