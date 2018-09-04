import React from 'react';
import { string } from 'prop-types';
import { storiesOf } from '@storybook/react';
import GlobalStyleDecorator from 'storybook/decorators/global-style';

import * as data from 'components/molecules/filter-panel/mock-data';
import FilterSection from './';

class Parent extends React.Component {
  state = {
    categories: data.categories,
    availabilities: data.availabilities,
    brands: data.brands,
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

  render() {
    const { filter } = this.props;
    const { categories, availabilities, brands } = this.state;

    let section;

    if (filter === 'categories')
      section = (
        <FilterSection
          type="tree"
          title="Categories"
          defaultLabel="All Categories"
          state={categories}
          onChange={this.updateOptions('categories')}
        />
      );

    if (filter === 'availabilities')
      section = (
        <FilterSection
          title="Availability"
          defaultLabel="All Availability"
          state={availabilities}
          onChange={this.updateOptions('availabilities')}
        />
      );

    if (filter === 'brands')
      section = (
        <FilterSection
          title="Brands"
          defaultLabel="All Brands"
          state={brands}
          onChange={this.updateOptions('brands')}
        />
      );

    return <div style={{ width: 220 }}>{section}</div>;
  }
}

Parent.propTypes = {
  filter: string,
};

export default storiesOf('FilterSection', module)
  .addDecorator(GlobalStyleDecorator)
  .add('Categories', () => <Parent filter="categories" />)
  .add('Availability', () => <Parent filter="availabilities" />)
  .add('Brands', () => <Parent filter="brands" />);
