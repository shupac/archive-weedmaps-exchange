import React from 'react';
import { string, boolean } from 'prop-types';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from '../../../.storybook/decorators/global-style';

import ComboCheckbox, { CheckboxGroup } from './';

class Parent extends React.Component {
  state = {
    checked: 0,
  };

  render() {
    const { name, allowPartial } = this.props;
    const { checked } = this.state;

    if (name)
      return (
        <CheckboxGroup
          name={name}
          checked={checked}
          allowPartial={allowPartial}
          onChange={next => this.setState({ checked: next })}
        />
      );

    return (
      <ComboCheckbox
        checked={checked}
        allowPartial={allowPartial}
        onChange={next => this.setState({ checked: next })}
      />
    );
  }
}

Parent.propTypes = {
  name: string,
  allowPartial: boolean,
};

export default storiesOf('ComboCheckbox', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <Parent />)
  .add('Allow Partial Check', () => <Parent allowPartial />)
  .add('With label', () => <Parent allowPartial name="Click me" />);
