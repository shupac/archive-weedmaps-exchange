import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';

import { categories } from 'components/molecules/filter-panel/mock-data';
import CheckboxTree from './';

class Parent extends React.Component {
  state = {
    tree: categories[0],
  };

  render() {
    return (
      <CheckboxTree
        state={this.state.tree}
        onChange={next => this.setState({ tree: next })}
      />
    );
  }
}

export default storiesOf('CheckboxTree', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <Parent />);
