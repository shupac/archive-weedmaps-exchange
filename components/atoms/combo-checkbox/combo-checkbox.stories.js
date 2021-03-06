import React from 'react';
import { boolean } from 'prop-types';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';

import ComboCheckbox from './';

class Parent extends React.Component {
  state = {
    checked: 0,
  };

  render() {
    const { allowPartial } = this.props;
    const { checked } = this.state;

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
  allowPartial: boolean,
};

export default storiesOf('ComboCheckbox', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <Parent />)
  .add('Allow Partial Check', () => <Parent allowPartial />);
