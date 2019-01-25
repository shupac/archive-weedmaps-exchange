// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';

import { categories } from 'components/molecules/filter-panel/mock-data';
import CheckboxTree from './';

type Props = {
  tree: any,
};

type State = {
  tree: any,
};

class Parent extends React.Component<Props, State> {
  state = {
    tree: this.props.tree,
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

const noChildren = {
  ...categories[0],
  children: [],
};

export default storiesOf('CheckboxTree', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <Parent tree={categories[0]} />)
  .add('NoChildren', () => <Parent tree={noChildren} />);
