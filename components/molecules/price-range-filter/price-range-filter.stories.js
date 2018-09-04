import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from '../../../.storybook/decorators/global-style';

import PriceRangeFilter from './';

class Parent extends React.Component {
  state = {
    state: {
      min: '',
      max: '',
    },
  };

  render() {
    const { state } = this.state;

    return (
      <div style={{ width: 220 }}>
        <PriceRangeFilter
          state={state}
          onChange={nextState => this.setState({ state: nextState })}
        />
      </div>
    );
  }
}

export default storiesOf('PriceRangeFilter', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <Parent />);
