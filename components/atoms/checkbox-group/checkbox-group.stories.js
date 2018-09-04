import React from 'react';
import { boolean } from 'prop-types';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';

import CheckboxGroup from './';

class Parent extends React.Component {
  state = {
    checkbox: {
      id: '1',
      name: 'Click me',
      checked: 0,
    },
  };

  render() {
    const { allowPartial } = this.props;

    return (
      <CheckboxGroup
        state={{ ...this.state.checkbox, allowPartial }}
        onChange={next => this.setState({ checkbox: next })}
      />
    );
  }
}

Parent.propTypes = {
  allowPartial: boolean,
};

export default storiesOf('CheckboxGroup', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <Parent />)
  .add('Allow Partial Check', () => <Parent allowPartial />);
