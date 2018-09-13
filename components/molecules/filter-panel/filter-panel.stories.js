import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';

import FilterSection from 'components/molecules/filter-section';
import PriceRangeFilter from 'components/molecules/price-range-filter';
import FilterPanel from './';

import * as data from './mock-data';

class Parent extends React.Component {
  state = {
    categories: data.categories,
    availabilities: data.availabilities,
    brands: data.brands,
    price: {
      min: '',
      max: '',
    },
  };

  updateOptions = section => nextState => {
    const states = this.state[section];

    const nextStates = states.map(state => {
      const thisId = state.id || state.parent.id;
      const nextId = nextState.id || nextState.parent.id;

      if (thisId === nextId) return nextState;
      return state;
    });

    this.setState({
      [section]: nextStates,
    });
  };

  clearAll = () => {
    // Reseting store to default values
    this.setState({
      categories: data.categories,
      availabilities: data.availabilities,
      brands: data.brands,
      price: {
        min: '',
        max: '',
      },
    });
  };

  render() {
    const { categories, availabilities, brands, price } = this.state;

    return (
      <FilterPanel onClearAll={this.clearAll}>
        <FilterSection
          type="tree"
          title="Categories"
          defaultLabel="All Categories"
          state={categories}
          onChange={this.updateOptions('categories')}
        />
        <FilterSection
          title="Availability"
          defaultLabel="All Availability"
          state={availabilities}
          onChange={this.updateOptions('availabilities')}
        />
        <FilterSection
          title="Brands"
          defaultLabel="All Brands"
          state={brands}
          onChange={this.updateOptions('brands')}
        />
        <PriceRangeFilter
          state={price}
          onChange={nextState => this.setState({ price: nextState })}
        />
      </FilterPanel>
    );
  }
}

export default storiesOf('FilterPanel', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Default', () => <Parent />);
